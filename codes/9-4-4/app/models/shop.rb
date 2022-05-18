# frozen_string_literal: true

# ## Schema Information
#
# Table name: `shops`
#
# ### Columns
#
# Name                  | Type               | Attributes
# --------------------- | ------------------ | ---------------------------
# **`id`**              | `integer`          | `not null, primary key`
# **`shopify_domain`**  | `string`           | `not null`
# **`shopify_token`**   | `string`           | `not null`
# **`created_at`**      | `datetime`         | `not null`
# **`updated_at`**      | `datetime`         | `not null`
# **`access_scopes`**   | `string`           |
#
# ### Indexes
#
# * `index_shops_on_shopify_domain` (_unique_):
#     * **`shopify_domain`**
#
class Shop < ApplicationRecord
  include ShopifyApp::ShopSessionStorageWithScopes

  with_options dependent: :destroy do
    has_one :anniversary_coupon_setting
    has_one :app_subscription
    has_many :app_usage_records
  end

  def api_version
    ShopifyApp.configuration.api_version
  end
end
