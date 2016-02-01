class Api::V1::UsersController < Api::V1::ApplicationController
  def create
    service = UserRegistration.new(create_params)
    user = service.user

    if service.save
      render json: user, meta: { token: user.authentication_token }
    else
      render status: 422, json: { errors: user.errors.full_messages }
    end
  end

  def show
    @user = User.find(show_params[:id])

    render json: @user
  end

  protected

  def create_params
    params.require(:user).permit(:name, :email, :password)
  end

  def show_params
    params.permit(:id)
  end
end
