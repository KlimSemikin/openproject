class CatalogItem < ApplicationRecord
  belongs_to :custom_field, touch: true

  validates :value, presence: true, length: { maximum: 255 }
  validates :custom_field, presence: true
  validate :custom_field_id_not_changed
  validate :new_parent_exists_in_catalog

  def to_s
    value
  end

  alias :name :to_s

  # makes virtual modal CatalogItemHierarchy available
  has_closure_tree name_column: :value, dependent: :destroy, order: 'position'

  # makes sorting by position available
  acts_as_list scope: [:parent_id, :custom_field_id], top_of_list: 0

  # Add methods for eager loading hierarchy
  has_many :eager_ancestors, -> { where.not("catalog_items.id = descendant_id") }, through: :ancestor_hierarchies, source: :ancestor
  has_many :self_and_descendants, through: :descendant_hierarchies, source: :descendant

  # Alias methods
  def catalog_id
    custom_field_id
  end

  def catalog
    custom_field
  end

  # true only if current custom_field contains in this project and user have rights to view_catalogs
  def visible?(user = User.current)
    return true if user.admin?

    Project.allowed_to(user, :view_catalogs)
    .joins(:work_package_custom_fields)
    .exists?(custom_fields: { id: custom_field_id })
  end

  protected

  # Checks parent presenting in current catalog(custom_field)
  def new_parent_exists_in_catalog
    return unless parent_id.present?

    unless WorkPackageCustomField
           .find_by(id: custom_field_id)&.catalog_items&.find_by(id: parent_id)
      errors.add(:parent_id, "has no found in this catalog!")
    end
  end

  # Prevent custom field editing
  def custom_field_id_not_changed
    if custom_field_id_changed? && self.persisted?
      errors.add(:custom_field_id, "Change of custom_field_id not allowed!")
    end
  end
end
