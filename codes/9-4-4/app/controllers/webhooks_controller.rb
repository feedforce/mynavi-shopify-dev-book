# frozen_string_literal: true

class WebhooksController < AuthenticatedController
  def index
    @webhooks = ShopifyAPI::Webhook.find(:all, params: { limit: 10 })
    render json: { webhooks: @webhooks }
  end
end
