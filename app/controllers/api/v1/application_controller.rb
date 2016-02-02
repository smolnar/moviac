class Api::V1::ApplicationController < ActionController::Base
  attr_accessor :current_user

  protect_from_forgery with: :null_session

  include ActionController::MimeResponds
  include ActionController::ImplicitRender

  def authenticate!
    user = Api::V1::AuthenticationService.authenticate(request)

    if user
      @current_user = user
    else
      return head 401
    end
  end

  rescue_from Api::V1::AuthenticationService::MissingEmailError do
    render status: 401, json: { message: 'You need to pass in email along with token in Authentication header.' }
  end
end
