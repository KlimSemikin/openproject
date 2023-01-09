class CreateCustomNestedOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :custom_nested_options do |t|
      t.integer :custom_field_id
      t.boolean :default_value
      t.text :value
      t.text :description

      t.timestamps
    end
  end
end
