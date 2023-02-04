module API
  module V3
    module CatalogItems
      class ParseParamsService < API::V3::ParseResourceParamsService
        # Be compatible to super
        def initialize(user, **_args)
          super(user, model: CatalogItem, representer: ::API::V3::CatalogItems::CatalogItemPayloadRepresenter)
        end

        private

        def parse_attributes(request_body)
          ::API::V3::CatalogItems::CatalogItemPayloadRepresenter
            .create(struct, current_user:)
            .from_hash(Hash(request_body))
            .to_h
        end

        def struct
          ParsingStruct.new
        end

        class ParsingStruct < OpenStruct
        end
      end
    end
  end
end
