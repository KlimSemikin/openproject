require 'api/v3/catalog_items/catalog_item_collection_representer'
require 'api/v3/catalog_items/catalog_item_representer'

module API
  module V3
    module CatalogItems
      class CatalogItemsAPI < ::API::OpenProjectAPI
        resources :catalog_items do
          helpers do
            def authorize_custom_option_visibility(catalog_item)
              raise API::Errors::NotFound model: :catalog_item unless catalog_item.visible?
            end
          end

          mount ::API::V3::CatalogItems::Schemas::CatalogItemSchemaAPI
          mount ::API::V3::CatalogItems::CreateFormAPI

          route_param :id, type: Integer, desc: 'CatalogItem ID' do
            helpers do
              attr_reader :catalog_item
            end

            after_validation do
              @catalog_item = CatalogItem.find(params[:id])
              authorize_custom_option_visibility(@catalog_item)
            end

            get do
              ::API::V3::CatalogItems::CatalogItemRepresenter.new(
                @catalog_item, current_user:, embed_links: true)
            end

            patch &::API::V3::CatalogItems::UpdateEndPoint.new(
              model: CatalogItem,
              parse_service: CatalogItems::ParseParamsService).mount

            delete &::API::V3::Utilities::Endpoints::Delete.new(model: CatalogItem).mount

            mount ::API::V3::CatalogItems::UpdateFormAPI
          end

          post &::API::V3::Utilities::Endpoints::Create.new(
            model: CatalogItem,
            parse_service: CatalogItems::ParseParamsService).mount
        end
      end
    end
  end
end
