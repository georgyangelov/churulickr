get '/user/email_taken' do
  User.where(email: params[:email]).exists? ? 'false' : 'true'
end

get '/user/username_taken' do
  User.where(username: params[:username]).exists? ? 'false' : 'true'
end

get '/user/logged_user_info' do
  return 400 unless session[:logged_in]

  User.find(session[:user_id]).public_info.to_json
end

get '/user/info/:username' do |username|
  User.where(username: username).first.public_info.to_json
end

post '/user/register' do
  user = User.new username:      params[:username],
                  fullname:      params[:fullname],
                  email:         params[:email],
                  register_date: DateTime.now,
                  avatar:        params[:avatar]

  user.password = params[:password]
  user.save!

  user.public_info.to_json
end

post '/user/login' do
  user = User.where(username: params[:username]).first

  return 403 unless user.password == params[:password]

  session[:logged_in] = true
  session[:user_id]   = user.id

  user.public_info.to_json
end

post '/user/logout' do
  session.clear
end

post '/user/follow/:username' do |username|
  User.where(username: username).first.followers << User.find(session[:user_id])
end

post '/user/unfollow/:username' do |username|
  User.where(username: username).first.followers.delete User.find(session[:user_id])
end

post '/user/verify/:username' do |username|
  halt 403 unless User.find(session[:user_id]).admin?

  user = User.where(username: username).first
  user.verified = true

  user.save!
end

post '/user/unverify/:username' do |username|
  halt 403 unless User.find(session[:user_id]).admin?

  user = User.where(username: username).first
  user.verified = false

  user.save!
end

post '/user/remove/:username' do |username|
  halt 403 unless User.find(session[:user_id]).admin?

  User.where(username: username).destroy

  200
end