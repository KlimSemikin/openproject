module API
  module V3
    module CatalogItems
      class CatalogItemRepresenter < ::API::Decorators::Single
        include API::Decorators::LinkedResource
        include API::Decorators::DateProperty
        include API::Caching::CachedRepresenter

        cached_representer key_parts: %i(catalog),
                           disabled: false

        self_link

        def _type
          'CatalogItem'
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
            href: api_v3_paths.catalog_items,
            method: :post,
            title: "Add child of #{represented.value}"
          }
        end

        link :changeParent, uncacheable: true do
          next if represented.new_record?

          {
            href: api_v3_paths.catalog_item(represented.id),
            method: :patch,
            title: "Change parent of #{represented.value}"
          }
        end

        links :children, uncacheable: true do
          next if visible_children.empty?

          visible_children.map do |child|
            {
              href: api_v3_paths.catalog_item(child.id),
              title: child.value
            }
          end
        end

        links :ancestors, uncacheable: true do
          next if visible_ancestors.empty?

          visible_ancestors.map do |ancestor|
            {
              href: api_v3_paths.catalog_item(ancestor.id),
              title: ancestor.value
            }
          end
        end

        link :availableRelationCandidates, uncacheable: true do
          next if represented.new_record?

          {
            href: api_v3_paths.catalog_items_by_catalog(represented.custom_field_id),
            title: "Potential custom nested options to relate to"
          }
        end

        associated_resource :catalog

        associated_resource :parent,
                            v3_path: :catalog_item,
                            representer: ::API::V3::CatalogItems::CatalogItemRepresenter,
                            skip_render: ->(*) { represented.parent },
                            link_title_attribute: :value,
                            uncacheable_link: true,
                            link: ->(*) {
                              if represented.parent
                                {
                                  href: api_v3_paths.catalog_item(represented.parent.id),
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
                                              expected_namespace: 'catalog_items'

                                  CatalogItem.find_by(id:)
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
