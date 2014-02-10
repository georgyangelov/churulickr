class Message
  include Mongoid::Document

  field :text,     type: String
  field :location, type: String
  field :date,     type: DateTime

  validates :text, presence: true, length: { minimum: 1, maximum: 140 }
  validates :date, presence: true

  belongs_to :author,
             class_name: 'User',
             inverse_of: :messages

  def public_info
    data = {
      text:      text,
      location:  location,
      date:      date,
      author:    author
    }

    data[:from] = author.username

    data
  end
end