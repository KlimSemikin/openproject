module API
  module V3
    module CustomNestedOptions
      module Schemas
        class CustomNestedOptionSchemaAPI < ::API::OpenProjectAPI
          resources :schema do
            get &::API::V3::Utilities::Endpoints::Schema.new(model: CustomNestedOption).mount
          end
        end
      end
    end
  end
end
