ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'sinatra/base'
require 'json'
require 'net/http'
# require 'typhoeus'

Bundler.require :default, ENV['RACK_ENV'].to_sym

class AppServer < Sinatra::Base
  get '/' do
    File.read('index.html')
  end

  get '/api' do
    content_type :json
    {
      ads: 2,
      lemonade: true
    }.to_json
  end

  run! if app_file == $0
end
