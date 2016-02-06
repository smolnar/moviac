class ApiConstraints
  def initialize(version:)
    @version = version
  end

  def matches?(request)
    request.headers['Accept'].include?("application/vnd.moviac.v#{@version}+json")
  end
end

Rails.application.routes.draw do
  mount_ember_app :frontend, to: '/'

  namespace :api, default: { format: 'json' } do
    scope module: :v1, constaints: ApiConstraints.new(version: 1) do
      resources :sessions, only: [:create]
      resources :users, only: [:create, :show]
      resources :movies, only: [:index, :create, :update]
    end
  end
end
