class Api::V1::UsersController < Api::V1::ApplicationController
  def create
    service = UserRegistration.new(create_params)
    user = service.user

    if service.save
      render json: user, meta: { authentication_token: user.authentication_token }
    else
      render status: 422, json: { errors: user.errors }
    end
  end

  protected

  def create_params
    params.require(:user).permit(:name, :email, :password)
  end
end
