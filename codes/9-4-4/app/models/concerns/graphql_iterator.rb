# frozen_string_literal: true

module GraphqlIterator
  extend ActiveSupport::Concern
  include GraphqlExecutor

  class_methods do
    # GraphQL を利用して Shopify Admin API にリクエストを送り、結果を Enumerator として返す
    #
    # @param shop [Shop]
    # @param query [GraphQL::Client::OperationDefinition]
    # @param path [String, Array<String>]
    #   イテレーターで取得したい Connection の path (snake_case)。
    #   ネストされている場合は配列で指定する。
    #   Connection は `edges` と `pageInfo` を field として持つ。
    # @param variables [Hash]
    #   Query 実行に利用する変数 default: {}
    # @return [Enumerator::Lazy]
    #   node を引数として返す Enumerator
    # @raise [GraphqlExecutor::Errors::Base]
    #   GraphQL の実行に失敗した場合
    def iterate_query(shop:, query:, path:, variables: {}) # rubocop:disable Metrics/AbcSize, Metrics/MethodLength
      cursor = nil
      Enumerator.new do |y|
        loop do
          response = execute_query_plain(shop:, query:, variables: variables.merge(cursor:).compact)
          connection = find_connection(response, path)
          connection.edges.each { |edge| y << edge.node }
          break if !connection.page_info.has_next_page? || connection.edges.blank?

          cursor = connection.edges.last.cursor
          sleep wait_time(response.extensions)
        end
      end.lazy
    end

    private

    # GraphQL の実行結果から Connection を取得する
    #
    # @param response [GraphQL::Client::Response] GraphQL の実行結果
    # @param paths [String, Array<String>] Connection の path (snake_case)
    # @return [Object] Connection オブジェクト
    # @raise [GraphqlExecutor::Errors::NotFound] 指定したリソースが見つからなかった場合
    def find_connection(response, paths)
      paths = [paths] if paths.is_a? String

      paths.inject(response.data) do |data, path|
        data.public_send(path) || raise(GraphqlExecutor::Errors::NotFound, response)
      end
    end

    # 消費した Query Cost を元に回復に必要な時間を計算する
    #
    # @param extensions [Hash] Admin API (GraphQL) のレスポンスに含まれる Rate Limit 情報
    # @return [Float] Rate Limit の回復に必要な時間 [秒]
    def wait_time(extensions)
      actual_query_cost = extensions.dig('cost', 'actualQueryCost')
      restore_rate = extensions.dig('cost', 'throttleStatus', 'restoreRate')
      actual_query_cost / restore_rate
    end
  end

  # GraphQL を利用して Shopify Admin API にリクエストを送る
  #
  # @see GraphqlExecutor.execute_query
  def iterate_query(...)
    self.class.iterate_query(...)
  end
end
