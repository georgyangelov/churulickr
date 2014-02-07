get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

# Compile less files in assets/ and map them to css files
get '/styles/*.css' do
  pass unless File.exist? File.join(settings.views, 'styles', params[:splat].first + '.less')

  less "styles/#{params[:splat].first}".to_sym
end