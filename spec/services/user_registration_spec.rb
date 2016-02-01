require 'spec_helper'
require 'active_support/all'
require_relative '../../app/services/user_registration'

RSpec.describe UserRegistration, type: :service do
  subject { UserRegistration.new(attributes, factory: factory, token_generator: token_generator) }

  let(:attributes) { { name: 'Peter Pan', email: 'molnar.samuel@gmail.com', password: 'password123' } }
  let(:user) { double(:user) }
  let(:factory) { double(:factory, new: user) }
  let(:token_generator) { double(:token_generator) }

  describe '#save' do
    it 'saves user with authentication token' do
      expect(user).to receive(:assign_attributes).with(attributes).ordered

      expect(user).to receive(:authentication_token=).with('key').ordered
      allow(token_generator).to receive(:generate) { 'key' }
      allow(factory).to receive(:exists?).with(authentication_token: 'key') { false }

      expect(user).to receive(:save).ordered

      subject.save
    end

    context 'when user with same authentication token exists' do
      it 'generates another authentication token' do
        expect(user).to receive(:assign_attributes).with(attributes).ordered

        allow(token_generator).to receive(:generate).and_return('key', 'another key')
        allow(factory).to receive(:exists?).with(authentication_token: 'key') { true }
        allow(factory).to receive(:exists?).with(authentication_token: 'another key') { false }
        expect(user).to receive(:authentication_token=).with('another key')

        expect(user).to receive(:save).ordered

        subject.save
      end
    end
  end
end
