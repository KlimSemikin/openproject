module API
  module V3
    module CustomNestedOptions
      module Schemas
        class CustomNestedOptionSchemaRepresenter < ::API::Decorators::SchemaRepresenter
          include API::Caching::CachedRepresenter

          schema :id,
                 type: 'Integer'

          schema :value,
                 type: 'String',
                 min_length: 1,
                 max_length: 255

          schema :description,
                 type: 'String',
                 min_length: 1,
                 max_length: 255,
                 required: false

          schema :position,
                 type: 'Integer',
                 required: false

          schema_with_allowed_link :parent,
                                   type: 'CustomNestedOption',
                                   required: false,
                                   writable: true,
                                   href_callback: ->(*) {
                                     custom_nested_option = represented.custom_nested_option
                                     if custom_nested_option&.persisted?
                                       api_v3_paths.custom_nested_options_by_tree(represented.custom_field_id)
                                     end
                                   }

          schema :created_at,
                 type: 'DateTime'

          schema :updated_at,
                 type: 'DateTime'

          def self.represented_class
            ::CustomNestedOption
          end
        end
      end
    end
  end
end
