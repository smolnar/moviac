class UserRegistration
  attr_reader :attributes, :user, :factory, :token_generator

  def initialize(attributes, factory: User, token_generator: SecureTokenGenerator)
    @attributes = attributes
    @factory = factory
    @token_generator = token_generator
    @user = factory.new
  end

  def save
    assign_attributes
    generate_authentication_token

    user.save
  end

  protected

  def assign_attributes
    user.assign_attributes(attributes.slice(:name, :email, :password))
  end

  def generate_authentication_token
    user.authentication_token = loop {
      token = token_generator.generate

      break token unless factory.exists?(authentication_token: token)
    }
  end
end
