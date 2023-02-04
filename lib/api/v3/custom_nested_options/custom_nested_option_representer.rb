module API
  module V3
    module CustomNestedOptions
      class CustomNestedOptionRepresenter < ::API::Decorators::Single
        include API::Decorators::LinkedResource
        include API::Decorators::DateProperty
        include API::Caching::CachedRepresenter

        self_link

        def _type
          'CustomNestedOption'
        end

        property :id, render_nil: true

        property :value, render_nil: true

        property :description, render_nil: true

        property :position, render_nil: true

        property :default_value, render_nil: true

        date_time_property :created_at

        date_time_property :updated_at

        link :addChild, uncacheable: true do
          next if represented.new_record?

          {
            href: api_v3_paths.custom_nested_options,
            method: :post,
            title: "Add child of #{represented.value}"
          }
        end

        link :changeParent, uncacheable: true do
          next if represented.new_record?

          {
            href: api_v3_paths.custom_nested_option(represented.id),
            method: :patch,
            title: "Change parent of #{represented.value}"
          }
        end

        links :children, uncacheable: true do
          next if visible_children.empty?

          visible_children.map do |child|
            {
              href: api_v3_paths.custom_nested_option(child.id),
              title: child.value
            }
          end
        end

        links :ancestors, uncacheable: true do
          next if visible_ancestors.empty?

          visible_ancestors.map do |ancestor|
            {
              href: api_v3_paths.custom_nested_option(ancestor.id),
              title: ancestor.value
            }
          end
        end

        link :availableRelationCandidates, uncacheable: true do
          next if represented.new_record?

          {
            href: api_v3_paths.custom_nested_options_by_tree(represented.custom_field_id),
            title: "Potential custom nested options to relate to"
          }
        end

        associated_resource :tree, uncacheable_link: true,
                            setter: ->(fragment:, **) do
                              next if fragment.empty?

                              href = fragment['href']

                              new_custom_field =
                                if href
                                  id = ::API::Utilities::ResourceLinkParser
                                         .parse_id href,
                                                   property: 'custom_field',
                                                   expected_version: '3',
                                                   expected_namespace: 'trees'

                                  WorkPackageCustomField.find_by(id:)
                                end

                              represented.custom_field = new_custom_field
                            end

        associated_resource :parent,
                            v3_path: :custom_nested_option,
                            representer: ::API::V3::CustomNestedOptions::CustomNestedOptionRepresenter,
                            skip_render: ->(*) { represented.parent },
                            link_title_attribute: :value,
                            uncacheable_link: true,
                            link: ->(*) {
                              if represented.parent
                                {
                                  href: api_v3_paths.custom_nested_option(represented.parent.id),
                                  title: represented.parent.value
                                }
                              else
                                {
                                  href: nil,
                                  title: nil
                                }
                              end
                            },
                            setter: ->(fragment:, **) do
                              next if fragment.empty?

                              href = fragment['href']

                              new_parent =
                                if href
                                  id = ::API::Utilities::ResourceLinkParser
                                    .parse_id href,
                                              property: 'parent',
                                              expected_version: '3',
                                              expected_namespace: 'custom_nested_options'

                                  CustomNestedOption.find_by(id:)
                                end

                              represented.parent = new_parent
                            end

        def visible_children
          @visible_children ||= represented.children
        end

        def visible_ancestors
          @visible_ancestors ||= represented.eager_ancestors
        end
      end
    end
  end
end
