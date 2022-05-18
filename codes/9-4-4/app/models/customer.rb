# frozen_string_literal: true

class Customer
  include GraphqlIterator

  Queries = ShopifyAPI::GraphQL.client(ShopifyApp.configuration.api_version).parse <<~GRAPHQL
    query FindBy($query: String!, $cursor: String) {
      customers(first: 10, query: $query, after: $cursor) {
        edges {
          node {
            id
            email
            createdAt
          }
          cursor
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  GRAPHQL

  class << self
    def search_by_anniversary(shop)
      variables = { query: generate_query(shop) }
      iterate_query(shop:, query: Queries::FindBy, path: 'customers', variables:)
    end

    private

    def generate_query(shop)
      target_date = shop.anniversary_coupon_setting.months.months.ago
      from = target_date.beginning_of_month
      to = target_date.end_of_month

      "customer_date:>=\"#{from.iso8601}\" customer_date:<=\"#{to.iso8601}\""
    end
  end
end
