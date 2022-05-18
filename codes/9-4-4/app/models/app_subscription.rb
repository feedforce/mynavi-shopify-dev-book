# frozen_string_literal: true

# ## Schema Information
#
# Table name: `app_subscriptions`
#
# ### Columns
#
# Name                        | Type               | Attributes
# --------------------------- | ------------------ | ---------------------------
# **`id`**                    | `integer`          | `not null, primary key`
# **`shop_id`**               | `integer`          | `not null`
# **`plan`**                  | `string`           | `default("free"), not null`
# **`app_subscription_id`**   | `string`           |
# **`recurring_pricing_id`**  | `string`           |
# **`usage_pricing_id`**      | `string`           |
# **`created_at`**            | `datetime`         | `not null`
# **`updated_at`**            | `datetime`         | `not null`
#
# ### Indexes
#
# * `index_app_subscriptions_on_shop_id`:
#     * **`shop_id`**
#
# ### Foreign Keys
#
# * `shop_id`:
#     * **`shop_id => shops.id`**
#
class AppSubscription < ApplicationRecord # rubocop:disable Metrics/ClassLength
  include GraphqlExecutor

  belongs_to :shop

  validates :plan, presence: true
  validates :recurring_pricing_id, :usage_pricing_id, presence: true, unless: :free_plan?

  enum :plan, { free: 'free', standard: 'standard' }, suffix: true, default: :free

  Queries = ShopifyAPI::GraphQL.client(ShopifyApp.configuration.api_version).parse <<~GRAPHQL
    query Find {
      appInstallation {
        activeSubscriptions {
          id
          lineItems {
            id
            plan {
              pricingDetails {
                __typename
              }
            }
          }
        }
      }
    }

    mutation Subscribe($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!, $test: Boolean) {
      appSubscriptionCreate(name: $name, lineItems: $lineItems, returnUrl: $returnUrl, test: $test) {
        confirmationUrl
        userErrors {
          field
          message
        }
      }
    }

    mutation Cancel($id: ID!) {
      appSubscriptionCancel(id: $id) {
        userErrors {
          field
          message
        }
      }
    }
  GRAPHQL

  # Standard プランの課金を開始
  #
  # @params return_url [String] マーチャントが課金を承認後にリダイレクトする先の URL
  # @return [String] 課金承認画面の URL
  def subscribe(return_url)
    variables = {
      name: 'Standard Plan',
      lineItems: line_items,
      returnUrl: return_url,
      test: !Rails.env.production?
    }
    execute_query(shop:, query: Queries::Subscribe, variables:)
      .app_subscription_create
      .confirmation_url
  end

  # Standard プランの有効化
  #
  # @note Shopify Admin API から課金情報を同期して DB の情報を更新する
  def activate
    return if active_subscription.blank?

    update!(
      plan: 'standard',
      app_subscription_id: active_subscription.id,
      recurring_pricing_id: recurring_pricing.id,
      usage_pricing_id: usage_pricing.id
    )
  end

  # Standard プランをキャンセルして Free プランに戻す
  def cancel
    return if app_subscription_id.blank?

    variables = { id: app_subscription_id }
    execute_query(shop:, query: Queries::Cancel, variables:)
    update!(
      plan: 'free',
      app_subscription_id: nil,
      recurring_pricing_id: nil,
      usage_pricing_id: nil
    )
  end

  private

  # Standard プランの課金情報
  def line_items
    [item_of_recurring_pricing, item_of_usage_pricing]
  end

  # Standard プランの 30 日サブスクリプション情報
  def item_of_recurring_pricing
    {
      plan: {
        appRecurringPricingDetails: {
          price: { amount: 10.00, currencyCode: 'USD' },
          interval: 'EVERY_30_DAYS'
        }
      }
    }
  end

  # Standard プランの従量課金情報
  def item_of_usage_pricing
    {
      plan: {
        appUsagePricingDetails: {
          terms: '$1 for 100 emails',
          cappedAmount: { amount: 1000.00, currencyCode: 'USD' }
        }
      }
    }
  end

  # Admin API からストアの現在有効な課金情報を取得する
  def active_subscription
    @active_subscription ||=
      execute_query(shop:, query: Queries::Find)
        .app_installation
        &.active_subscriptions
        &.last
  end

  # ストアの現在有効な 30 日サブスクリプションの情報を取得する
  def recurring_pricing
    active_subscription.line_items.find do |line_item|
      line_item.plan.pricing_details.__typename == 'AppRecurringPricing'
    end
  end

  # ストアの現在有効な従量課金の情報を取得する
  def usage_pricing
    active_subscription.line_items.find do |line_item|
      line_item.plan.pricing_details.__typename == 'AppUsagePricing'
    end
  end
end
