require 'rails_helper'

RSpec.describe Api::V1::SessionsController, type: :api do
  let(:headers) { { 'Accept' => 'application/vnd.moviac.v1+json' } }

  describe 'POST create' do
    context 'with valid credentials' do
      it 'creates new session' do
        user = create(:user, password: 'password123')
        attributes = { email: user.email, password: 'password123' }

        post 'api/sessions', attributes, headers

        expect(last_response.status).to eql(200)

        body = JSON.parse(last_response.body, symbolize_names: true)

        expect(body[:meta]).to eql(authentication_token: user.authentication_token)
      end
    end

    context 'with invalid credentials' do
      it 'send back an error' do
        user = create(:user)
        attributes = { email: user.email, password: 'bogus' }

        post 'api/sessions', attributes, headers

        expect(last_response.status).to eql(401)

        body = JSON.parse(last_response.body, symbolize_names: true)

        expect(body).to eql(message: 'Email and password do not match.')
      end
    end
  end
end
