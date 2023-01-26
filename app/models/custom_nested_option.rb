class CustomNestedOption < ApplicationRecord
  belongs_to :custom_field, touch: true

  validates :value, presence: true, length: { maximum: 255 }

  before_destroy :assure_at_least_one_option

  def to_s
    value
  end

  alias :name :to_s

  # makes virtual modal CustomNestedOptionHierarchy available
  has_closure_tree name_column: :value, dependent: :destroy, order: 'position'

  def visible?(user = User.current)
    Project.allowed_to(user, :view_trees)
    .joins(:work_package_custom_fields)
    .exists?(custom_fields: { id: custom_field_id })
  end

  protected

  def assure_at_least_one_option
    return if CustomNestedOption.where(custom_field_id:).where.not(id:).count > 0

    errors.add(:base, I18n.t(:'activerecord.errors.models.custom_field.at_least_one_custom_option'))

    throw :abort
  end
end
