class Api::V1::MoviesController < Api::V1::ApplicationController
  def index
    page = index_params[:page].to_i || 0

    @movies = Movie.order(:id).offset(20 * page).limit(20)

    render json: @movies, meta: { page: page }
  end

  protected

  def index_params
    params.permit(:page)
  end
end
