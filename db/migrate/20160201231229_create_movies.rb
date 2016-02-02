class CreateMovies < ActiveRecord::Migration[5.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.string :directors, null: false, array: true
      t.string :actors, null: false, array: true
      t.decimal :rating, null: false, precision: 2, scale: 1

      t.timestamps
    end

    add_index :movies, :title
    add_index :movies, :actors, using: :gin
  end
end
