class CustomValue::TreeStrategy < CustomValue::ARObjectStrategy
  def validate_type_of_value
    unless custom_field.custom_nested_options.pluck(:id).include?(value.to_i)
      :inclusion
    end
  end

  def typed_value
    super_value = super
    (super_value && super_value.to_s) || nil
  end

  private

  def ar_class
    CustomNestedOption
  end

  def ar_object(value)
    option = CustomNestedOption.find_by(id: value.to_s)
    if option.nil?
      "#{value} #{I18n.t(:label_not_found)}"
    else
      option.value
    end
  end
end
