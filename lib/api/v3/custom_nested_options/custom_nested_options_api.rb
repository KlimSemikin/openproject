require 'api/v3/custom_nested_options/custom_nested_option_collection_representer'
require 'api/v3/custom_nested_options/custom_nested_option_representer'

module API
  module V3
    module CustomNestedOptions
      class CustomNestedOptionsAPI < ::API::OpenProjectAPI
        resources :custom_nested_options do
          helpers do
            def custom_nested_option
              @co ||= CustomNestedOption.find(params[:id])
            end

            def authorize_custom_option_visibility(custom_nested_option)
              raise API::Errors::NotFound unless custom_nested_option.visible?
            end
          end

          route_param :id, type: Integer, desc: 'CustomNestedOption ID' do
            get do
              authorize_custom_option_visibility(custom_nested_option)
              ::API::V3::CustomNestedOptions::CustomNestedOptionRepresenter.new(custom_nested_option, current_user:, embed_links: true)
            end
          end
        end
      end
    end
  end
end
