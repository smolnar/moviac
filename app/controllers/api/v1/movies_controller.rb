class Api::V1::MoviesController < Api::V1::ApplicationController
  before_action :authenticate!, only: [:create]

  def index
    page = index_params[:page].to_i || 0
    order = index_params[:order].to_sym.in?([:asc, :desc]) ? index_params[:order] : :desc
    @movies = Movie.order(rating: order).offset(10 * page).limit(10)

    render json: @movies, meta: { next: @movies.empty? ? page : page + 1 }
  end

  def create
    @creator = MovieCreator.new(create_params, user: current_user)
    @movie = @creator.create

    if @movie.valid?
      render json: @movie
    else
      render status: 422, json: { errors: @movie.errors }
    end
  end

  protected

  def index_params
    params.permit(:page, :order)
  end

  def create_params
    params.require(:movie).permit(:title, :rating, directors: [], actors: [])
  end
end
