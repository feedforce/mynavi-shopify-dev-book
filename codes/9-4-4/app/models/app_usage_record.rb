# frozen_string_literal: true

# ## Schema Information
#
# Table name: `app_usage_records`
#
# ### Columns
#
# Name                       | Type               | Attributes
# -------------------------- | ------------------ | ---------------------------
# **`id`**                   | `integer`          | `not null, primary key`
# **`shop_id`**              | `integer`          | `not null`
# **`app_usage_record_id`**  | `string`           | `not null`
# **`created_at`**           | `datetime`         | `not null`
# **`updated_at`**           | `datetime`         | `not null`
#
# ### Indexes
#
# * `index_app_usage_records_on_shop_id`:
#     * **`shop_id`**
#
# ### Foreign Keys
#
# * `shop_id`:
#     * **`shop_id => shops.id`**
#
class AppUsageRecord < ApplicationRecord
  include GraphqlExecutor

  belongs_to :shop

  validates :app_usage_record_id, presence: true

  Queries = ShopifyAPI::GraphQL.client(ShopifyApp.configuration.api_version).parse <<~GRAPHQL
    mutation Create($id: ID!, $description: String!, $price: MoneyInput!) {
      appUsageRecordCreate(
        subscriptionLineItemId: $id
        description: $description
        price: $price
      ) {
        appUsageRecord {
          id
        }
        userErrors {
          field
          message
        }
      }
    }

    query History {
      appInstallation {
        activeSubscriptions {
          id
          currentPeriodEnd
          lineItems {
            id
            plan {
              pricingDetails {
                ... on AppRecurringPricing {
                  __typename
                }
                ... on AppUsagePricing {
                  __typename
                }
              }
            }
            usageRecords(first: 10) {
              edges {
                node {
                  id
                  description
                  createdAt
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  GRAPHQL

  class << self
    # 従量課金を請求する
    #
    # @param shop [Shop]
    def charge(shop)
      variables = {
        id: shop.app_subscription.usage_pricing_id,
        description: '$1 for 100 emails',
        price: { amount: 1.00, currencyCode: 'USD' }
      }

      result = execute_query(shop:, query: Queries::Create, variables:)
      shop.app_usage_records.create!(
        app_usage_record_id: result.app_usage_record_create.app_usage_record.id
      )
    end

    # 従量課金の履歴を確認する（デバッグ用)
    #
    # @param shop [Shop]
    # @return [Hash]
    def history(shop)
      execute_query(shop:, query: Queries::History).to_h
    end
  end
end
