class StaticPagesController < ApplicationController
  def home
    @featured_articles = Article.featured
    @science_articles = Article.science
    @social_articles = Article.social
  end

  def hire
  end

  def academic_papers
  end
end