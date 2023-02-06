module API
  module V3
    module CatalogItems
      class CreateFormRepresenter < FormRepresenter
        include API::Decorators::CreateForm
      end
    end
  end
end
