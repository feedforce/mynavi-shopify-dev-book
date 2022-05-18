# frozen_string_literal: true

# ## Schema Information
#
# Table name: `anniversary_coupon_settings`
#
# ### Columns
#
# Name              | Type               | Attributes
# ----------------- | ------------------ | ---------------------------
# **`id`**          | `integer`          | `not null, primary key`
# **`shop_id`**     | `integer`          | `not null`
# **`months`**      | `integer`          | `default(0), not null`
# **`amount`**      | `float`            | `default(0.0), not null`
# **`created_at`**  | `datetime`         | `not null`
# **`updated_at`**  | `datetime`         | `not null`
#
# ### Indexes
#
# * `index_anniversary_coupon_settings_on_shop_id`:
#     * **`shop_id`**
#
# ### Foreign Keys
#
# * `shop_id`:
#     * **`shop_id => shops.id`**
#
class AnniversaryCouponSetting < ApplicationRecord
  belongs_to :shop

  validates :months, :amount, presence: true
end
