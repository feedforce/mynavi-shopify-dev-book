# frozen_string_literal: true

class CreateAppSubscriptions < ActiveRecord::Migration[7.0]
  def change
    create_table :app_subscriptions do |t|
      t.references :shop, null: false, foreign_key: true
      t.string :plan, null: false, default: 'free'
      t.string :app_subscription_id
      t.string :recurring_pricing_id
      t.string :usage_pricing_id

      t.timestamps
    end
  end
end
