# frozen_string_literal: true

module Shopify
  module Webhooks
    class CustomersDataRequestJob < ApplicationJob
      queue_as :default

      def perform(shop_domain:, webhook:)
        logger.info("Customer data has been requested: #{webhook.inspect}")
      end
    end
  end
end
