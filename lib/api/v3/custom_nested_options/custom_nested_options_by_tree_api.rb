require 'api/v3/custom_nested_options/custom_nested_option_collection_representer'

module API
  module V3
    module CustomNestedOptions
      class CustomNestedOptionsByTreeAPI < ::API::OpenProjectAPI
        resources :custom_nested_options do
          get do
            authorize_tree_visibility(current_user, @tree)
            custom_nested_options = @tree.custom_nested_options
            CustomNestedOptionCollectionRepresenter.new(custom_nested_options,
                                                        self_link: api_v3_paths.custom_nested_options_by_tree(@tree.id),
                                                        current_user:)
          end
        end
      end
    end
  end
end
