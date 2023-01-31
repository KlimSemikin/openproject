module CustomNestedOptions
  class UpdateContract < BaseContract
    attribute :custom_field_id do
      ensure_unchanged_tree_id
    end

    private

    def ensure_unchanged_tree_id
      if model.custom_field_id_changed?
        _current_custom_field_id = model.custom_field_id

        model.custom_field_id = model.custom_field_id_was
      end
    end
  end
end
