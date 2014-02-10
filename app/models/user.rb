require 'bcrypt'

class User
  include Mongoid::Document
  include BCrypt

  field :username,      type: String
  field :fullname,      type: String
  field :password_hash, type: String
  field :email,         type: String
  field :register_date, type: DateTime
  field :verified,      type: Boolean, default: false
  field :admin,         type: Boolean, default: false

  validates :username,      presence: true, uniqueness: true
  validates :email,         presence: true, uniqueness: true
  validates :password_hash, presence: true
  validates :fullname,      presence: true

  has_many :messages,
           dependent:  :delete,
           inverse_of: :author

  has_and_belongs_to_many :followers,
                          class_name: 'User'

  alias_method :admin?, :admin

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def following
    User.where(follower_ids: id)
  end

  def public_info
    data = {
      email:         email,
      fullname:      fullname,
      username:      username,
      verified:      verified,
      register_date: register_date,
      admin:         admin,
    }

    data[:followers]    = followers.map(&:username)
    data[:following]    = User.where(follower_ids: id).map(&:username)
    data[:tweets_count] = messages.count

    data
  end

end