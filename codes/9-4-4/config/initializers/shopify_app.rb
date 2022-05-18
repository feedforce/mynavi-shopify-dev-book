# frozen_string_literal: true

ShopifyApp.configure do |config|
  config.application_name = 'Happy anniversary'
  config.old_secret = ''
  config.scope = 'read_customers,write_discounts'
  config.embedded_app = true
  config.after_authenticate_job = { job: 'Shopify::AfterAuthenticateJob', inline: false }
  config.api_version = '2022-01'
  config.shop_session_repository = 'Shop'

  config.reauth_on_access_scope_changes = true

  config.allow_jwt_authentication = true
  config.allow_cookie_authentication = false

  config.webhook_jobs_namespace = 'shopify/webhooks'
  config.webhooks = [
    # NOTE: ENV.fetch('HOST') does not work, because the environment variable has been trimmed in Shopify CLI.
    # See: https://github.com/Shopify/shopify-cli/blob/fd1c3190e7decb1103a0b8839edcd96d824fc309/lib/shopify_cli/services/app/serve/rails_service.rb#L34
    { topic: 'app/uninstalled', address: 'https://2caa-126-194-156-225.ngrok.io/webhooks/app_uninstalled' }
  ]

  config.api_key = ENV.fetch('SHOPIFY_API_KEY', '').presence
  config.secret = ENV.fetch('SHOPIFY_API_SECRET', '').presence
  if defined? Rails::Server
    raise('Missing SHOPIFY_API_KEY. See https://github.com/Shopify/shopify_app#requirements') unless config.api_key
    raise('Missing SHOPIFY_API_SECRET. See https://github.com/Shopify/shopify_app#requirements') unless config.secret
  end
end

# Uncomment to fetch known api versions from shopify servers on boot
# ShopifyApp::Utils.fetch_known_api_versions

# Uncomment to raise an error if attempting to use an api version that was not previously known
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown
