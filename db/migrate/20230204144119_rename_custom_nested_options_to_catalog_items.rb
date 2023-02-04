class RenameCatalogItemsToCatalogItems < ActiveRecord::Migration[7.0]
  def change
    rename_table :custom_nested_options, :catalog_items
  end
end
