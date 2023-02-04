module API
  module V3
    module CatalogItems
      module Schemas
        class CatalogItemSchemaRepresenter < ::API::Decorators::SchemaRepresenter
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
                                   type: 'CatalogItem',
                                   required: false,
                                   writable: true,
                                   href_callback: ->(*) {
                                     catalog_item = represented.catalog_item
                                     if catalog_item&.persisted?
                                       api_v3_paths.catalog_items_by_catalog(represented.custom_field_id)
                                     end
                                   }

          schema :created_at,
                 type: 'DateTime'

          schema :updated_at,
                 type: 'DateTime'

          def self.represented_class
            ::CatalogItem
          end
        end
      end
    end
  end
end
