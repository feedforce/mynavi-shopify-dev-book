digest = OpenSSL::Digest.new('sha256')
# The Shopify app's API secret key, viewable from the Partner Dashboard. In a production environment, set the API secret key as an environment variable to prevent exposing it in code
secret = 'my_api_secret_key'
message = 'code=0907a61c0c8d55e99db179b68161bc00&shop={shop}.myshopify.com&state=0.6784241404160823&timestamp=1337178173'

digest = OpenSSL::HMAC.hexdigest(digest, secret, message)
ActiveSupport::SecurityUtils.secure_compare(digest, '700e2dadb827fcc8609e9d5ce208b2e9cdaab9df07390d2cbca10d7c328fc4bf')
