class Movie < ApplicationRecord
  validates :title, presence: true
  validates :rating, presence: true, numericality: true
  validates :directors, presence: true
  validates :actors, presence: true
  validates :poster_url, presence: true
  validates :plot, presence: true
  validates :year, presence: true, numericality: true
end
