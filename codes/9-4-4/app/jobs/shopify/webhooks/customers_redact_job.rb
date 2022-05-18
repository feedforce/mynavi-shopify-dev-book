# frozen_string_literal: true

module Shopify
  module Webhooks
    class CustomersRedactJob < ApplicationJob
      queue_as :default

      def perform(shop_domain:, webhook:)
        logger.info("Customer redaction has been requested: #{webhook.inspect}")
      end
    end
  end
end
