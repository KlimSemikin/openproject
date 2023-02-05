module API
  module V3
    module CatalogItems
      class FormRepresenter < ::API::Decorators::Form
        def payload_representer
          CatalogItemPayloadRepresenter
          .create(represented, current_user:)
        end
      end
    end
  end
end
