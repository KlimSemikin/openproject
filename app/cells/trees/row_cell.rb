module Trees
  class RowCell < ::RowCell
    def custom_field
      model
    end

    def name
      link_to h(custom_field.name), project_tree_path(params[:project_id], custom_field)
    end

    def is_required
      checked_image custom_field.is_required?
    end

    def is_for_all
      checked_image custom_field.is_for_all?
    end

    def is_filter
      checked_image custom_field.is_filter?
    end

    def searchable
      checked_image custom_field.searchable?
    end

    def created_at
      format_time custom_field.created_at
    end
  end
end
