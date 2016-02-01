FactoryGirl.define do
  factory :user do
    sequence(:email) { |n| "example_#{n}@gmail.com" }

    name 'Peter Pan'
    password 'password123'
    authentication_token SecureRandom.hex(64)
  end
end
