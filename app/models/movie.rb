class Movie < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validates :rating, presence: true, numericality: true
  validates :directors, presence: true
  validates :actors, presence: true
end
