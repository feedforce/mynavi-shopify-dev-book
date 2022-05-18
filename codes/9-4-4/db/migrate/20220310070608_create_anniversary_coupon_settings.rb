# frozen_string_literal: true

class CreateAnniversaryCouponSettings < ActiveRecord::Migration[7.0]
  def change
    create_table :anniversary_coupon_settings do |t|
      t.references :shop, null: false, foreign_key: true
      t.integer :months, null: false, default: 0
      t.float :amount, null: false, default: 0.0

      t.timestamps
    end
  end
end
