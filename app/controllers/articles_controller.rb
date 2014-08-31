class ArticlesController < ApplicationController
  before_filter :authenticate_user!

  def index
    @articles = Article.all
  end

  def new
    @article = Article.new
  end

  def create
    @article = Article.create(articles_params)

    if @article.save
      flash[:success] = "Article added."
      redirect_to articles_path
    else
      flash[:alert] = "Error saving article."
      redirect_to new_article_path
    end
  end

  def edit
    @article = Article.find(params[:id])
  end

  def update

  end

  def destroy

  end

  private

  def articles_params
    params.require(:article).permit(:title, :short_title, :featured, :link, :category)
  end
end