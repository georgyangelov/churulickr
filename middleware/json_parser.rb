require 'json'

module Rack

  # A Rack middleware for parsing POST/PUT body data when Content-Type is
  # not one of the standard supported types, like <tt>application/json</tt>.
  class JSONParser

    # Constants
    #
    CONTENT_TYPE = 'CONTENT_TYPE'.freeze
    POST_BODY = 'rack.input'.freeze
    FORM_INPUT = 'rack.request.form_input'.freeze
    FORM_HASH = 'rack.request.form_hash'.freeze

    # Supported Content-Types
    #
    APPLICATION_JSON = 'application/json'.freeze

    def initialize(app)
      @app = app
    end

    def call(env)
      media_type = Rack::Request.new(env).media_type

      if not media_type.nil? and media_type.include?(APPLICATION_JSON) and (body = env[POST_BODY].read).length != 0
        env[POST_BODY].rewind # somebody might try to read this stream
        env.update(FORM_HASH => JSON.parse(body), FORM_INPUT => env[POST_BODY])
      end
      @app.call(env)
    end

  end
end