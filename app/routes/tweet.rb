post '/tweet' do
  message = Message.new text: params[:message],
                        date: DateTime.now
  message.location = params[:location] if params[:location]

  message.save!
end