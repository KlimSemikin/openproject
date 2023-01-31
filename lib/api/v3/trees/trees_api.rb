require 'api/v3/trees/tree_collection_representer'
require 'api/v3/trees/tree_representer'

# Api for trees (WorkPackageCustomField with field_format = tree). Related with CustomNestedOptionsAPI
module API
  module V3
    module Trees
      class TreesAPI < ::API::OpenProjectAPI
        resources :trees do
          helpers do
            def trees
              @trees ||= WorkPackageCustomField.trees
            end

            def self_link
              api_v3_paths.trees
            end

            def authorize_tree_visibility(current_user, tree)
              return true if current_user.admin?

              raise API::Errors::NotFound unless Project.allowed_to(current_user, :view_trees)
                .joins(:work_package_custom_fields)
                .exists?(custom_fields: { id: tree.id })
            end
          end

          get do
            ::API::V3::Trees::TreeCollectionRepresenter.new(trees, self_link:, current_user:)
          end

          route_param :id, type: Integer, desc: 'Tree ID' do
            after_validation do
              @tree = trees.find(params[:id])
            end

            get do
              authorize_tree_visibility(current_user, @tree)
              ::API::V3::Trees::TreeRepresenter.new(@tree, current_user:, embed_links: true)
            end

            mount API::V3::CustomNestedOptions::CustomNestedOptionsByTreeAPI
          end
        end
      end
    end
  end
end
