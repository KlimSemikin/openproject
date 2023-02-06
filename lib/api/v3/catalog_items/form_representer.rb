module API
  module V3
    module CatalogItems
      class FormRepresenter < ::API::Decorators::SimpleForm
        def model
          CatalogItem
        end
      end
    end
  end
end
