# frozen_string_literal: true

module Shopify
  module Webhooks
    class ShopRedactJob < ApplicationJob
      queue_as :default

      def perform(shop_domain:, webhook:)
        logger.info("Shop redaction has been requested: #{webhook.inspect}")
      end
    end
  end
end
