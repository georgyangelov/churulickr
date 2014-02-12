post '/tweet' do
  user    = User.find(session[:user_id])
  message = Message.new text:   params[:message],
                        date:   DateTime.now,
                        author: user

  message.location = params[:location] if params[:location]

  message.save!

  # Push a notification to all subscribers
  socket_message = message.public_info.to_json

  broadcast 'tweet/all', socket_message
  broadcast "tweet/user/#{user.username}", socket_message
  broadcast "tweet/personal/#{user.id}", socket_message

  user.follower_ids.each do |follower_id|
    broadcast "tweet/personal/#{follower_id}", socket_message
  end

  200
end

get '/tweet/all' do
  Message.all.order_by(date: :desc).map(&:public_info).to_json
end

get '/tweet' do
  user = User.find(session[:user_id])
  Message.any_in(author_id: user.following.map(&:id) + [session[:user_id]]).order_by(date: :desc).map(&:public_info).to_json
end

get '/tweet/:username' do |username|
  user = User.where(username: username).first
  user.messages.order_by(date: :desc).map(&:public_info).to_json
end


socket '/socket/tweet/all',       proc { "tweet/all" }
socket '/socket/tweet',           proc { "tweet/personal/#{session[:user_id]}" }
socket '/socket/tweet/:username', proc { "tweet/user/#{params[:username]}" }