class RenameCustomNestedOptionHierarchiesToCatalogItemHierarchies < ActiveRecord::Migration[7.0]
  def change
    rename_table :custom_nested_option_hierarchies, :catalog_item_hierarchies
  end
end
