class MovieCreator
  attr_accessor :attributes, :factory, :service

  def initialize(attributes, factory:, service:)
    @attributes = attributes
    @service = service
    @factory = factory
  end

  def create
    movie = factory.new(title: attributes[:title])

    return movie unless attributes[:title].present?

    search = service.new(attributes[:title])
    data = search.movies.first

    movie.with_lock do
      movie.update_attributes(
        rating: attributes[:rating],
        directors: (data.try(:director) + attributes[:directors].to_a).uniq,
        actors: (data.try(:cast_members) + attributes[:actors].to_a).uniq,
        poster_url: data.try(:poster),
        plot: data.try(:plot),
        tagline: data.try(:tagline),
        year: data.try(:year)
      )
    end

    movie
  end
end
