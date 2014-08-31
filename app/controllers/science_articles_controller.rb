class ScienceArticlesController < ApplicationController
  def index
    @articles = Article.science
  end
end