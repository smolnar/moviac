module Movies::Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks

    settings index: { number_of_shards: 1 }

    mappings do
      indexes :title, analyzer: :english
      indexes :actors, analyzer: :english
      indexes :directors, analyzer: :english
      indexes :rating, type: :float
    end
  end

  class_methods do
    def search(query, page: 0, order: :asc)
      proxy = __elasticsearch__
      search = Hash.new

      if query
        search.merge!(
          query: {
            query_string: {
              query: "#{query}*",
              fields: ['title^2', :actors, :directors],
              default_operator: :AND
            }
          }
        )
      end

      search.merge!(
        sort: {
          rating: order
        },

        from: page * 25,
        size: 25
      )

      proxy.search(search).records
    end
  end
end
