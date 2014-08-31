Rails.application.routes.draw do
  devise_for :users
  get "home/index"
  get "/science-articles", to: 'science_articles#index'
  get "/social-articles", to: 'social_articles#index'

  root to: "home#index"

  resources :articles
end
