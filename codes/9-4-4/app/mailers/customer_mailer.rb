# frozen_string_literal: true

class CustomerMailer < ApplicationMailer
  def anniversary_coupon
    @customer = params[:customer]
    @code = params[:code]
    @months = params[:shop].anniversary_coupon_setting.months

    mail to: @customer.email, subject: 'Happy anniversary!'
  end
end
