module Trees
  class TableCell < ::TableCell
    # options :current_user # adds this option to those of the base class
    columns :name, :is_required, :is_for_all, :is_filter, :searchable, :created_at

    def initial_sort
      %i[name asc]
    end

    def headers
      columns.map do |name|
        [name.to_s, header_options(name)]
      end
    end

    def header_options(name)
      options = { caption: CustomField.human_attribute_name(name) }

      options[:default_order] = 'desc' if desc_by_default.include? name

      options
    end

    def desc_by_default
      %i[is_required is_for_all is_filter searchable created_at]
    end
  end
end
