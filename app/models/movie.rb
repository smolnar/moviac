class Movie < ApplicationRecord
  validates :title, presence: true
  validates :rating, presence: true, numerality: true
  validates :director, presence: true
  validates :actors, presence: true
end
