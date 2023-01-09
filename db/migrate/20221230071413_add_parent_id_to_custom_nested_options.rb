class AddParentIdToCustomNestedOptions < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_nested_options, :parent_id, :integer
  end
end
