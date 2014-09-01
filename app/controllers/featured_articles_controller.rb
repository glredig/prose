class FeaturedArticlesController < ApplicationController
  def index
    @articles = Article.featured

    respond_to do |format|
      format.json { render json: @articles }
    end
  end
end