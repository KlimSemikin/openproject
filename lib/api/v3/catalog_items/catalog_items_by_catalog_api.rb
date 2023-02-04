require 'api/v3/catalog_items/catalog_item_collection_representer'

module API
  module V3
    module CatalogItems
      class CatalogItemsByCatalogAPI < ::API::OpenProjectAPI
        resources :catalog_items do
          get do
            authorize_catalog_visibility(current_user, @catalog)

            catalog_items = @catalog.catalog_items.includes(:children, :parent, :eager_ancestors)

            CatalogItemCollectionRepresenter.new(catalog_items,
                                                        self_link: api_v3_paths.catalog_items_by_catalog(@catalog.id),
                                                        current_user:)
          end
        end
      end
    end
  end
end
