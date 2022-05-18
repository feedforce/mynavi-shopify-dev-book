# frozen_string_literal: true

class DiscountCode
  include GraphqlExecutor

  Queries = ShopifyAPI::GraphQL.client(ShopifyApp.configuration.api_version).parse <<~GRAPHQL
    mutation Create($input: DiscountCodeBasicInput!) {
      discountCodeBasicCreate(basicCodeDiscount: $input) {
        codeDiscountNode {
          id
          codeDiscount {
            ... on DiscountCodeBasic {
              customerSelection {
                ... on DiscountCustomers {
                  customers {
                    id
                    displayName
                    email
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  GRAPHQL

  class << self
    def create_discount_code(shop, customer_ids, code)
      variables = { input: generate_variables(shop, customer_ids, code) }
      execute_query(shop:, query: Queries::Create, variables:)
    end

    private

    def generate_variables(shop, customer_ids, code) # rubocop:disable Metrics/MethodLength
      {
        title: 'Happy anniversary!',
        startsAt: Time.current.iso8601,
        endsAt: 1.month.since.iso8601,
        appliesOncePerCustomer: true,
        customerSelection: {
          customers: {
            add: customer_ids
          }
        },
        code:,
        customerGets: {
          items: {
            all: true
          },
          value: {
            discountAmount: {
              amount: shop.anniversary_coupon_setting.amount,
              appliesOnEachItem: false
            }
          }
        }
      }
    end
  end
end
