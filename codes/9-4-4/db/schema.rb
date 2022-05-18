# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_03_22_161244) do
  create_table "anniversary_coupon_settings", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.integer "months", default: 0, null: false
    t.float "amount", default: 0.0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_anniversary_coupon_settings_on_shop_id"
  end

  create_table "app_subscriptions", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.string "plan", default: "free", null: false
    t.string "app_subscription_id"
    t.string "recurring_pricing_id"
    t.string "usage_pricing_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_app_subscriptions_on_shop_id"
  end

  create_table "app_usage_records", force: :cascade do |t|
    t.integer "shop_id", null: false
    t.string "app_usage_record_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["shop_id"], name: "index_app_usage_records_on_shop_id"
  end

  create_table "shops", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "access_scopes"
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  add_foreign_key "anniversary_coupon_settings", "shops"
  add_foreign_key "app_subscriptions", "shops"
  add_foreign_key "app_usage_records", "shops"
end
