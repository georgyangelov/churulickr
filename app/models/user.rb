require 'bcrypt'

class User
  include Mongoid::Document
  include BCrypt

  field :username,      type: String
  field :password_hash, type: String
  field :email,         type: String
  field :register_date, type: DateTime
  field :verified,      type: Boolean, default: false

  validates :username,      presence: true, uniqueness: true
  validates :email,         presence: true, uniqueness: true
  validates :password_hash, presence: true

  has_many :messages,
           dependent:  :delete,
           inverse_of: :author

  has_and_belongs_to_many :followers,
                          class_name: 'User'

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def public_info(with_followers=false)
    data = {
      email:         email,
      username:      username,
      verified:      verified,
      register_date: register_date,
    }

    data[:followers] = followers if with_followers

    data
  end

end