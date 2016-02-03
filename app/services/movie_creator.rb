class MovieCreator
  attr_accessor :attributes, :factory, :service, :user

  def initialize(attributes, user:, factory: Movie, service: Imdb::Search)
    @attributes = attributes
    @service = service
    @factory = factory
    @user = user
  end

  def create
    movie = factory.new(title: attributes[:title])

    return movie unless attributes[:title].present?

    data = find_movie_metadata

    movie.with_lock do
      movie.update_attributes(
        user: user,
        rating: attributes[:rating],
        directors: (data.director + attributes[:directors].to_a).uniq,
        actors: (data.cast_members + attributes[:actors].to_a).uniq,
        poster_url: data.poster,
        plot: data.plot,
        tagline: data.tagline,
        year: data.year
      )
    end

    movie
  end

  private

  def find_movie_metadata
    search = service.new(attributes[:title])

    search.movies.first || NullServiceObject.new
  end

  class NullServiceObject
    def director
      []
    end

    def cast_members
      []
    end

    def poster
      nil
    end

    def plot
      nil
    end

    def tagline
      nil
    end

    def year
      nil
    end
  end
end
