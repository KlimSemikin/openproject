module API
  module V3
    module CatalogItems
      module Schemas
        class CatalogItemSchemaAPI < ::API::OpenProjectAPI
          resources :schema do
            get &::API::V3::Utilities::Endpoints::Schema.new(model: CatalogItem).mount
          end
        end
      end
    end
  end
end
