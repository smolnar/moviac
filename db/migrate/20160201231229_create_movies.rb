class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :directors, null: false, array: true
      t.string :actors, null: false, array: true
      t.decimal :rating, null: false, precision: 2, scale: 1
      t.string :tagline, length: 2048
      t.text :plot
      t.integer :year
      t.string :poster_url

      t.timestamps
    end

    add_index :movies, :title, unique: true
    add_index :movies, :actors, using: :gin
    add_index :movies, :directors, using: :gin
  end
end
