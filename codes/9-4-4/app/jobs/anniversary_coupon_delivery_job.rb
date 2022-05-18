# frozen_string_literal: true

class AnniversaryCouponDeliveryJob < ApplicationJob
  queue_as :default

  def perform(shop)
    initialize_attributes(shop)
    customer_ids = search_customers_by_anniversary
    issue_discount_coupons(customer_ids).each do |customer|
      next if customer.email.blank?

      send_an_anniversary_mail(customer)
      charge_usage_pricing
    end
  end

  private

  attr_reader :shop, :code

  # ジョブで使用する変数の初期化
  def initialize_attributes(shop)
    @shop = shop
    @code = SecureRandom.alphanumeric(6)
    @count = 0
  end

  # クーポン配信対象となる顧客の検索
  def search_customers_by_anniversary
    Customer.search_by_anniversary(shop).map(&:id).force
  end

  # クーポンコードを発行する
  def issue_discount_coupons(customer_ids)
    DiscountCode
      .create_discount_code(shop, customer_ids, code)
      .discount_code_basic_create
      .code_discount_node
      .code_discount
      .customer_selection
      .customers
  end

  # クーポンコード付きアニバーサリーメールを配信する
  def send_an_anniversary_mail(customer)
    CustomerMailer
      .with(shop:, customer:, code:)
      .anniversary_coupon
      .deliver_now
    @count += 1
  end

  # 配信数に応じて従量課金の請求を行う
  def charge_usage_pricing
    return if @count < 1

    AppUsageRecord.charge(shop)
    @count = 0
  end
end
