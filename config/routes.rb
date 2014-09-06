Rails.application.routes.draw do
  devise_for :users
  get "/", to: 'static_pages#home'
  get "/hire-me", to: 'static_pages#hire'
  get "/science-articles", to: 'science_articles#index'
  get "/social-articles", to: 'social_articles#index'
  get "/featured-articles", to: 'featured_articles#index'
  get "/academic-papers", to: 'static_pages#academic_papers'

  root to: "static_pages#home"

  resources :articles
end
