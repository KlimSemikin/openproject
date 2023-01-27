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

        property :custom_field_id

        property :position

        property :default_value, render_nil: true

        date_time_property :created_at

        date_time_property :updated_at

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
