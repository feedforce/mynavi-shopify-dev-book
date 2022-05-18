# frozen_string_literal: true

class AddShopAccessScopesColumn < ActiveRecord::Migration[7.0]
  def change
    add_column :shops, :access_scopes, :string, after: :shopify_token
  end
end
