require 'sinatra'
require 'json'
require 'mongoid'
require 'bcrypt'

APP_ROOT = __dir__

# Require stuff
Dir["#{APP_ROOT}/app/helpers/*.rb"].each { |file| require file }
Dir["#{APP_ROOT}/app/filters/*.rb"].each { |file| require file }
Dir["#{APP_ROOT}/app/models/*.rb" ].each { |file| require file }
Dir["#{APP_ROOT}/app/routes/*.rb" ].each { |file| require file }

# Load mongoid configuration
Mongoid.load!("#{APP_ROOT}/config/mongoid.yml", :development)