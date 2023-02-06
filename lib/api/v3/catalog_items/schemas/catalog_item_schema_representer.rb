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

          schema :parent,
                 type: 'CatalogItem',
                 required: false,
                 location: :link

          schema :catalog,
                 type: 'Catalog',
                 required: true,
                 location: :link

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
