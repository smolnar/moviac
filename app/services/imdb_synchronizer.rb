class ImdbSynchronizer
  def self.synchronize(factory: Movie, service: Imdb::Top250.new)
    service.movies.each do |data|
      next if data.title.blank?

      movie = factory.find_or_initialize_by(title: data.title)

      movie.update_attributes!(
        rating: data.rating,
        directors: data.director,
        actors: data.cast_members
      )
    end
  end
end
