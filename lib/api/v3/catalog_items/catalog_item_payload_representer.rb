module API
  module V3
    module CatalogItems
      class CatalogItemPayloadRepresenter < CatalogItemRepresenter
        include ::API::Utilities::PayloadRepresenter

        cached_representer disabled: true

        def load_complete_model(model)
          model
        end
      end
    end
  end
end
