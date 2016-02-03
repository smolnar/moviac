class IncreateRatingScaleOnMovies < ActiveRecord::Migration[5.0]
  def up
    change_column :movies, :rating, :decimal, scale: 1, precision: 3
  end

  def down
    change_column :movies, :rating, :decimal, scale: 1, precision: 2
  end
end
