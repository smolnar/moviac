class AddUniqueIndexOnTitle < ActiveRecord::Migration[5.0]
  def change
    add_index :movies, :title, unique: true
  end
end
