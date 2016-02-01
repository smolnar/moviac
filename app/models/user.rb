class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, presence: true, uniqueness: true
  validates :authentication_token, presence: true, uniqueness: true, length: { is: 128 }
end
