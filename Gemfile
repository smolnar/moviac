source 'https://rubygems.org'

gem 'rails', github: 'rails/rails'
gem 'arel', github: 'rails/arel'
gem 'rack', github: 'rack/rack'

# Database
gem 'sqlite3'

# Security
gem 'bcrypt', '~> 3.1.7'

# Webserver
gem 'puma'

# Serializers
gem 'active_model_serializers', '~> 0.10.0.rc3'
gem 'oj'
gem 'oj_mimic_json'

# Configuration
gem 'dotenv-rails'

# Ember
gem 'ember-cli-rails', '~> 0.7.0'

group :development, :test do
  # Debugging
  gem 'pry'
  gem 'pry-rails'
  gem 'ruby-prof'

  # Testing
  # TODO once rspec for Rails 5 is released, remove
  %w[rspec-rails rspec rspec-core rspec-expectations rspec-mocks rspec-support].each do |lib|
    gem lib, github: "rspec/#{lib}"
  end

  gem 'fuubar'
  gem 'database_rewinder'
  gem 'factory_girl_rails', '~> 4.5'
  gem 'rails-controller-testing'
  gem 'capybara'
  gem 'poltergeist'
  gem 'vcr'
  gem 'timecop'
end

group :development do
  gem 'spring'
end
