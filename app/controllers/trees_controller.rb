class TreesController < ApplicationController
  model_object CustomField
  include Layout

  before_action :find_optional_project, only: [:index, :show]
  before_action :find_trees, only: [:index, :show]
  before_action :authorize

  def index
  end

  def show
    @tree = @trees.find_by(id: params[:id])

    redirect_to action: :index unless @tree.present?
  end

  private

  def find_trees
    if @project.present?
      @trees = @project.work_package_custom_fields.where(field_format: "tree")
    else
      @trees = WorkPackageCustomField.where(field_format: "tree")
    end
  end
end
