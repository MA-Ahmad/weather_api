Rails.application.routes.draw do
  root to: 'home#index'
  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'
      post :auth, to: "authentication#create"
      
      resources :locations do
        resources :recordings
      end
    end
  end

  resources :locations
end
