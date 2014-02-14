require 'sinatra'
require 'sinatra-websocket'
require 'json'
require 'mongoid'
require 'bcrypt'
require 'carrierwave/mongoid'
require 'less'

require_relative 'middleware/json_parser'

APP_ROOT = __dir__

# Parse json post data
use Rack::JSONParser

# Store session data on the server
use Rack::Session::Pool

# Require stuff
Dir["#{APP_ROOT}/app/helpers/*.rb"].each { |file| require file }
Dir["#{APP_ROOT}/app/filters/*.rb"].each { |file| require file }
Dir["#{APP_ROOT}/app/models/*.rb" ].each { |file| require file }
Dir["#{APP_ROOT}/app/routes/*.rb" ].each { |file| require file }

# Load mongoid configuration
Mongoid.load!("#{APP_ROOT}/config/mongoid.yml", :development)

# Sinatra configuration
set :static,        true
set :public_folder, "#{APP_ROOT}/assets"
set :views,         "#{APP_ROOT}/assets"
set :bind,          '0.0.0.0'

set :socket_channels, SocketChannels.new
