if ENV['SEARCHBOX_URL']
  Elasticsearch::Model.client = Elasticsearch::Client.new(host: ENV['SEARCHBOX_URL'])
end
