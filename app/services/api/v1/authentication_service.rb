module Api::V1
  class AuthenticationService
    class MissingEmailError < ArgumentError; end

    def self.authenticate(request)
      token, options = ActionController::HttpAuthentication::Token.token_and_options(request)

      raise MissingEmailError unless options[:email]

      user = User.find_by(email: options[:email])

      if user && ActiveSupport::SecurityUtils.secure_compare(user.authentication_token, token)
        user
      end
    end
  end
end
