class Api::V1::MoviesController < Api::V1::ApplicationController
  def index
    page = index_params[:page].to_i || 0
    @movies = Movie.order(rating: :desc).offset(10 * page).limit(10)

    render json: @movies, meta: { next: @movies.empty? ? page : page + 1 }
  end

  protected

  def index_params
    params.permit(:page)
  end
end
