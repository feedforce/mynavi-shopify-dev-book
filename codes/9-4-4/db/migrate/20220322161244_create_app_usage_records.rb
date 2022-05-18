# frozen_string_literal: true

class CreateAppUsageRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :app_usage_records do |t|
      t.references :shop, null: false, foreign_key: true
      t.string :app_usage_record_id, null: false

      t.timestamps
    end
  end
end
