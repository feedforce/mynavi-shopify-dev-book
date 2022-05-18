# frozen_string_literal: true

module Shopify
  class AfterAuthenticateJob < ApplicationJob
    def perform(shop_domain:)
      initialize_attributes(shop_domain)
      create_app_subscription
      create_anniversary_coupon_setting
      notify_app_installation
    end

    private

    attr_reader :shop

    def initialize_attributes(shop_domain)
      @shop = Shop.find_by(shopify_domain: shop_domain)
    end

    def create_app_subscription
      return if shop.app_subscription.present?

      shop.create_app_subscription
    end

    def create_anniversary_coupon_setting
      return if shop.anniversary_coupon_setting.present?

      shop.create_anniversary_coupon_setting(months: 3, amount: 1000.0)
    end

    def notify_app_installation
      return if shop.created_at.before? 5.minutes.ago

      logger.info('The app has been installed!')
    end
  end
end
