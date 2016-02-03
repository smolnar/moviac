class Movie < ApplicationRecord
  belongs_to :user, required: false

  validates :title, presence: true, uniqueness: true
  validates :rating, presence: true, numericality: { greater_than_or_equal_to: 0.0, less_than_or_equal_to: 10.0 }
  validates :directors, presence: true
  validates :actors, presence: true
end
