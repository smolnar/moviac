module SecureTokenGenerator
  def self.generate(length: 64)
    SecureRandom.hex(length)
  end
end
