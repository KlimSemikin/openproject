module API
  module V3
    module CatalogItems
      class UpdateFormRepresenter < FormRepresenter
        include API::Decorators::UpdateForm
      end
    end
  end
end
