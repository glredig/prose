class SocialArticlesController < ApplicationController
  def index
    @articles = Article.social
  end
end