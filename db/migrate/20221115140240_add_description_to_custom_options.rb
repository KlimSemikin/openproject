class AddDescriptionToCustomOptions < ActiveRecord::Migration[7.0]
  def change
    add_column :custom_options, :description, :text
  end
end
