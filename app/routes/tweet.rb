post '/tweet' do
  user    = User.find(session[:user_id])
  message = Message.new text:   params[:message],
                        date:   DateTime.now,
                        author: user

  message.location = params[:location] if params[:location]

  message.save!
end