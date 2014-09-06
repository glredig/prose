class ArticlesController < ApplicationController
  before_filter :authenticate_user!, except: :index

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
    @article = Article.find(params[:id])

    if @article.update_attributes(articles_params)
      flash[:success] = "Changes saved!"
      redirect_to articles_path
    else
      flash[:alert] = "Changes weren't saved."
      redirect_to edit_article_path(@article)
    end
  end

  def destroy
    Article.find(params[:id]).destroy
    flash[:success] = "Post deleted."
    redirect_to articles_path
  end

  private

  def articles_params
    params.require(:article).permit(:title, :short_title, :featured, :link, :category, :article_image, :content)
  end
end