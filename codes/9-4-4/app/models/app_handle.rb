# frozen_string_literal: true

class AppHandle
  include GraphqlExecutor

  Queries = ShopifyAPI::GraphQL.client(ShopifyApp.configuration.api_version).parse <<~GRAPHQL
    query Find {
      app {
        handle
      }
    }
  GRAPHQL

  class << self
    def find_by(shop)
      execute_query(shop:, query: Queries::Find).app.handle
    end
  end
end
