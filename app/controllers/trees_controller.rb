class TreesController < ApplicationController
  model_object CustomField
  include Layout

  before_action :find_optional_project, only: %i[index show]
  before_action :find_trees, only: %i[index show]
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

  def find_trees
    @trees = if @project.present?
               @project.work_package_custom_fields.where(field_format: "tree")
             else
               WorkPackageCustomField.where(field_format: "tree")
             end
  end
end
