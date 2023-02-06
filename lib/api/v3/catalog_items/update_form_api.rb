module API
  module V3
    module CatalogItems
      class UpdateFormAPI < ::API::OpenProjectAPI
        resource :form do
          post &::API::V3::Utilities::Endpoints::UpdateForm.new(model: CatalogItem,
                                                                parse_service: CatalogItems::ParseParamsService).mount
        end
      end
    end
  end
end
