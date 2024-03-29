class AddGinIndicesToMovies < ActiveRecord::Migration[5.0]
  def up
    remove_index :movies, :title

    execute <<-SQL
      CREATE INDEX index_movies_on_title_with_gin ON movies USING GIN(to_tsvector('english', lower(title)));
    SQL
  end

  def down
    execute <<-SQL
      DROP INDEX index_movies_on_title_with_gin;
    SQL

    add_index :movies, :title, unique: true
  end
end
