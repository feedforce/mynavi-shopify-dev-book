# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/customer_mailer
class CustomerMailerPreview < ActionMailer::Preview
  # Preview this email at http://localhost:3000/rails/mailers/customer_mailer/anniversary_coupon
  def anniversary_coupon
    CustomerMailer.anniversary_coupon
  end
end
