require 'api/v3/catalogs/catalog_collection_representer'
require 'api/v3/catalogs/catalog_representer'

# Api for catalogs (WorkPackageCustomField with field_format = tree). Related with CatalogItemsAPI
module API
  module V3
    module Catalogs
      class CatalogsAPI < ::API::OpenProjectAPI
        resources :catalogs do
          helpers do
            def catalogs
              @catalogs ||= WorkPackageCustomField.catalogs
            end

            def self_link
              api_v3_paths.catalogs
            end

            def authorize_catalog_visibility(current_user, tree)
              return true if current_user.admin?

              raise API::Errors::NotFound unless Project.allowed_to(current_user, :view_catalogs)
                .joins(:work_package_custom_fields)
                .exists?(custom_fields: { id: tree.id })
            end
          end

          get do
            ::API::V3::Catalogs::CatalogCollectionRepresenter.new(catalogs, self_link:, current_user:)
          end

          route_param :id, type: Integer, desc: 'Catalog ID' do
            after_validation do
              @catalog = catalogs.find(params[:id])
            end

            get do
              authorize_catalog_visibility(current_user, @catalog)
              ::API::V3::Catalogs::CatalogRepresenter.new(@catalog, current_user:, embed_links: true)
            end

            mount API::V3::CatalogItems::CatalogItemsByCatalogAPI
          end
        end
      end
    end
  end
end
