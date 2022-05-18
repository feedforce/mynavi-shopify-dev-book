# frozen_string_literal: true

Rails.application.routes.draw do
  mount ShopifyApp::Engine, at: '/'

  root to: 'home#index'
  resources :customers, only: :index
  resources :webhooks, only: :index

  resource :app_subscription, only: :show do
    post 'free'
    post 'standard'
    post 'activate'
  end
end
