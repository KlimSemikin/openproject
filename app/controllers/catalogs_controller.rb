class CatalogsController < ApplicationController
  model_object CustomField
  include Layout

  before_action :find_optional_project, only: %i[index show]
  before_action :find_catalogs, only: %i[index show]
  before_action :authorize

  def index; end

  def show
    respond_to do |format|
      format.html do
        render :show,
               locals: { query: @query, project: @project },
               layout: 'angular/angular'
      end
    end
  end

  private

  def find_catalogs
    @catalogs = if @project.present?
               @project.work_package_custom_fields.catalogs
             else
               WorkPackageCustomField.catalogs
             end
  end
end
