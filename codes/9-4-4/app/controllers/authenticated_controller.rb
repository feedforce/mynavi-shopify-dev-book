# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::Authenticated

  private

  # 現在ログイン中のストアモデルを取得する
  #
  # @return [Shop]
  def current_shop
    @current_shop ||= Shop.find_by!(shopify_domain: jwt_shopify_domain)
  end
end
