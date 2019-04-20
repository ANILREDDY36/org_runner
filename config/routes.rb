Rails.application.routes.draw do
  resources :articles
  resources :users
  resources :roles do
  	collection do
  		get :hide_roles
  		post :hide_roles_update
  	end
  end
  root :to => "users#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
