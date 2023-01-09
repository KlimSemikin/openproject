class AddSortOrderToCustomNestedOptions < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_nested_options, :sort_order, :integer
  end
end
