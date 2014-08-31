class HomeController < ApplicationController
  def index
    @featured_articles = Article.featured
  end
end