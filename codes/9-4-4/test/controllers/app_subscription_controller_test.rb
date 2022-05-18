# frozen_string_literal: true

require 'test_helper'

class AppSubscriptionControllerTest < ActionDispatch::IntegrationTest
  test 'should get free' do
    get app_subscription_free_url
    assert_response :success
  end

  test 'should get standard' do
    get app_subscription_standard_url
    assert_response :success
  end

  test 'should get activate' do
    get app_subscription_activate_url
    assert_response :success
  end
end
