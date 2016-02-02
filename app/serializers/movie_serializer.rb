class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :directors, :actors, :rating, :poster_url, :plot, :tagline, :year
end
