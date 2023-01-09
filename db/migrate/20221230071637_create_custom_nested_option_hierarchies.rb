class CreateCustomNestedOptionHierarchies < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_nested_option_hierarchies, id: false do |t|
      t.integer :ancestor_id, null: false
      t.integer :descendant_id, null: false
      t.integer :generations, null: false
    end

    add_index :custom_nested_option_hierarchies, [:ancestor_id, :descendant_id, :generations],
      unique: true,
      name: "custom_nested_option_anc_desc_idx"

    add_index :custom_nested_option_hierarchies, [:descendant_id],
      name: "custom_nested_option_desc_idx"
  end
end
