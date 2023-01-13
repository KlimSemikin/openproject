class AddPositionToCustomNestedOptions < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_nested_options, :position, :integer
  end
end
