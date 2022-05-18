# frozen_string_literal: true

require 'test_helper'

class CustomerMailerTest < ActionMailer::TestCase
  test 'anniversary_coupon' do
    mail = CustomerMailer.anniversary_coupon
    assert_equal 'Anniversary coupon', mail.subject
    assert_equal ['to@example.org'], mail.to
    assert_equal ['from@example.com'], mail.from
    assert_match 'Hi', mail.body.encoded
  end
end
