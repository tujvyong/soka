Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :api, format: 'json' do
    namespace :v1 do
      resources :posts
    end
  end
end
