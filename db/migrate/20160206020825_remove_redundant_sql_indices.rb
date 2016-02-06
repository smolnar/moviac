class RemoveRedundantSqlIndices < ActiveRecord::Migration[5.0]
  def up
    remove_index :movies, :actors
    remove_index :movies, :directors

    execute <<-SQL
      DROP INDEX index_movies_on_title_with_gin;
    SQL
  end

  def down
    add_index :movies, :actors, using: :gin
    add_index :movies, :directos, using: :gin

    execute <<-SQL
      CREATE INDEX index_movies_on_title_with_gin ON movies USING GIN(to_tsvector('english', lower(title)));
    SQL
  end
end
