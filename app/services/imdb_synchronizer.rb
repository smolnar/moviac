class ImdbSynchronizer
  def self.synchronize(factory: Movie, service: Imdb::Top250.new)
    service.movies.each do |data|
      next if data.title.blank?

      title = data.title.match(/\d+\.\n\s+(.*)/)[1]
      movie = factory.find_or_initialize_by(title: title)

      movie.with_lock do
        movie.update_attributes!(
          rating: data.rating,
          directors: data.director,
          actors: data.cast_members,
          poster_url: data.poster,
          plot: data.plot,
          tagline: data.tagline,
          year: data.year
        )
      end
    end
  end
end
