post '/tweet' do
  user    = User.find(session[:user_id])
  message = Message.new text:   params[:message],
                        date:   DateTime.now,
                        author: user

  message.location = params[:location] if params[:location]

  message.save!
end

get '/tweet/all' do
  Message.all.map(&:public_info).to_json
end

get '/tweet' do
  user = User.find(session[:user_id])
  Message.any_in(author_id: user.following.map(&:id)).map(&:public_info).to_json
end

get '/tweet/:username' do |username|
  user = User.where(username: username).first
  user.messages.map(&:public_info).to_json
end