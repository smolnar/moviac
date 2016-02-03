namespace :imdb do
  desc 'Synchronize IMDb'
  task synchronize: :environment do
    ImdbSynchronizer.synchronize
  end
end
