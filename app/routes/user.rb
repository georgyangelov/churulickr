get '/user/email_taken' do
  User.where(email: params[:email]).exists? ? 'false' : 'true'
end

post '/user/register' do
  p params
  user = User.new username:      params[:username],
                  email:         params[:email],
                  register_date: DateTime.now

  user.password = params[:password]
  user.save!
end

post '/user/login' do
  user = User.where(username: params[:username]).first

  return 403 unless user.password == params[:password]

  session[:logged_in] = true
  session[:user_id]   = user.id
end