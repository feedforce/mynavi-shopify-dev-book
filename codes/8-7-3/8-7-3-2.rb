require 'rubygems'
require 'base64'
require 'openssl'
require 'sinatra'
require 'active_support/security_utils'

# The Shopify app's API secret key, viewable from the Partner Dashboard. In a production environment, set the API secret key as an environment variable to prevent exposing it in code.
API_SECRET_KEY = 'my_api_secret_key'

helpers do
  # Compare the computed HMAC digest based on the API secret key and the request contents to the reported HMAC in the headers
  def verify_webhook(data, hmac_header)
    calculated_hmac = Base64.strict_encode64(OpenSSL::HMAC.digest('sha256', API_SECRET_KEY, data))
    ActiveSupport::SecurityUtils.secure_compare(calculated_hmac, hmac_header)
  end
end

# Respond to HTTP POST requests sent to this web service
post '/' do
  request.body.rewind
  data = request.body.read
  verified = verify_webhook(data, env["HTTP_X_SHOPIFY_HMAC_SHA256"])

  halt 401 unless verified

  # Process webhook payload
  # ...
end
