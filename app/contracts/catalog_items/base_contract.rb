module CatalogItems
  class BaseContract < ::ModelContract
    attribute :value

    attribute :description
    attribute :custom_field_id
    attribute :parent_id
    attribute :position
    attribute :default_value

    def self.model
      CatalogItem
    end

    validate :validate_custom_field

    def validate_custom_field
      errors.add :custom_field, :error_not_found if custom_field_id.present? && !custom_field_visible?
    end

    def custom_field_visible?
      return true if user.admin?

      Project.allowed_to(user, :view_catalogs)
      .joins(:work_package_custom_fields)
      .exists?(custom_fields: { id: custom_field_id })
    end
  end
end
