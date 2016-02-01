class Api::V1::SessionsController < Api::V1::ApplicationController
  def create
    user = User.find_by(email: create_params[:email])

    if user.try(:authenticate, create_params[:password])
      render json: user, meta: { authentication_token: user.authentication_token }
    else
      render status: 401, json: { message: 'Email and password do not match.' }
    end
  end

  protected

  def create_params
    params.permit(:email, :password)
  end
end
