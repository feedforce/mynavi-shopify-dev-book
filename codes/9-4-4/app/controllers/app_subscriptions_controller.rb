# frozen_string_literal: true

class AppSubscriptionsController < AuthenticatedController
  # GET  /app_subscription
  def show
    render json: { app_subscription: }
  end

  # POST /app_subscription/free
  def free
    current_shop.app_subscription.cancel

    render json: { app_subscription: }
  end

  # POST /app_subscription/standard
  def standard
    app_handle = AppHandle.find_by(current_shop)
    return_url = "https://#{current_shop.shopify_domain}/admin/apps/#{app_handle}?activate=true"
    confirmation_url = current_shop.app_subscription.subscribe(return_url)

    render json: { app_subscription: { confirmation_url: } }
  end

  # POST /app_subscription/activate
  def activate
    current_shop.app_subscription.activate

    render json: { app_subscription: }
  end

  private

  def app_subscription
    { plan: current_shop.app_subscription.plan }
  end
end
