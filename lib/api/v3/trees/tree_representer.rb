module API
  module V3
    module Trees
      class TreeRepresenter < ::API::Decorators::Single
        include API::Decorators::LinkedResource
        include API::Caching::CachedRepresenter

        self_link title_getter: ->(*) {}

        property :id

        property :name

        link :CatalogItems, uncacheable: true do
          { href: api_v3_paths.catalog_items_by_tree(represented.id) }
        end

        def _type
          'Tree'
        end
      end
    end
  end
end
