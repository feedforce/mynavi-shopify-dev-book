# frozen_string_literal: true

module GraphqlExecutor
  extend ActiveSupport::Concern

  # GraphQL のレスポンスにエラーが含まれた場合の例外クラス
  class Error < StandardError
    attr_reader :errors

    def initialize(errors)
      @errors = errors
      super(errors.inspect)
    end
  end

  class_methods do
    # GraphQL を利用して Shopify Admin API にリクエストを送る。
    # 拡張データ含めて結果は全て返す。
    #
    # @param shop [Shop]
    # @param query [GraphQL::Client::OperationDefinition]
    # @param variables [Hash] default: {}
    # @return [GraphQL::Client::Response]
    def execute_query_plain(shop:, query:, variables: {})
      result = shop.with_shopify_session do
        client = ShopifyAPI::GraphQL.client
        client.query(query, variables:)
      end
      raise Error, result.errors if result.errors.present?

      result
    end

    # GraphQL を利用して Shopify Admin API にリクエストを送る。
    # 結果はデータ部のみ返す。
    #
    # @see GraphqlExecutor.execute_query_plain
    # @return [GraphQL::Client::Schema::ObjectClass]
    def execute_query(...)
      execute_query_plain(...).data
    end
  end

  # GraphQL を利用して Shopify Admin API にリクエストを送る
  #
  # @see GraphqlExecutor.execute_query
  def execute_query(...)
    self.class.execute_query(...)
  end
end
