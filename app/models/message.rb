class Message
  include Mongoid::Document

  field :text,     type: String
  field :location, type: String
  field :date,     type: DateTime

  validates :text, presence: true, length: { minimum: 1, maximum: 140 }

  belongs_to :author,
             class_name: 'User',
             inverse_of: :messages
end