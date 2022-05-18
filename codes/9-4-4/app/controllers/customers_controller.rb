# frozen_string_literal: true

class CustomersController < AuthenticatedController
  def index
    @customers = ShopifyAPI::Customer.find(:all, params: { limit: 10 })
    render json: { customers: @customers }
  end
end
