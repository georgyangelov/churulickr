get '/user/email_taken' do
  User.where(email: params[:email]).exists? ? 'false' : 'true'
end

get '/user/username_taken' do
  User.where(username: params[:username]).exists? ? 'false' : 'true'
end

get '/user/info' do
  return 400 unless session[:logged_in]

  User.find(session[:user_id]).public_info(true).to_json
end

post '/user/register' do
  user = User.new username:      params[:username],
                  email:         params[:email],
                  register_date: DateTime.now

  user.password = params[:password]
  user.save!

  user.public_info(true).to_json
end

post '/user/login' do
  user = User.where(username: params[:username]).first

  return 403 unless user.password == params[:password]

  session[:logged_in] = true
  session[:user_id]   = user.id

  user.public_info(true).to_json
end

post '/user/logout' do
  session.clear
end