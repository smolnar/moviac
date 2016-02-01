require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :api do
  let(:headers) { { 'Accept' => 'application/vnd.moviac.v1+json' } }

  describe 'POST create' do
    it 'creates user and sends back authentication token' do
      attributes = { user: { name: 'Peter Pan', email: 'peter.pan@gmail.com', password: 'password123' } }

      expect {
        post '/api/users', attributes, headers
      }.to change { User.count }.by(1)

      expect(last_response.status).to eql(200)
      expect(User.exists?(name: 'Peter Pan', email: 'peter.pan@gmail.com')).to be_truthy

      user = User.find_by(email: 'peter.pan@gmail.com')
      body = JSON.parse(last_response.body, symbolize_names: true)

      expect(body[:meta]).to eql(token: user.authentication_token)
    end

    context 'with validation error' do
      it 'does not create user' do
        attributes = { user: { email: 'peter.pan@gmail.com' } }

        expect {
          post '/api/users', attributes, headers
        }.not_to change { User.count }

        expect(last_response.status).to eql(422)
        expect(last_response.body).to eql({ errors: { password: ['can\'t be blank'], name: ['can\'t be blank'] } }.to_json)
      end
    end
  end
end
