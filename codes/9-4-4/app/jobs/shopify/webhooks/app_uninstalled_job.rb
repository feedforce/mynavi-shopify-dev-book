# frozen_string_literal: true

module Shopify
  module Webhooks
    class AppUninstalledJob < ApplicationJob
      def perform(shop_domain:, webhook:) # rubocop:disable Lint/UnusedMethodArgument
        shop = Shop.find_by(shopify_domain: shop_domain)
        shop.destroy
        logger.info('The app has been uninstalled!')
      end
    end
  end
end
