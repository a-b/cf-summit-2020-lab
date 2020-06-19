ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'sinatra/base'
require 'json'
require 'net/http'

Bundler.require :default, ENV['RACK_ENV'].to_sym

class AppServer < Sinatra::Base

  set :public_folder, File.dirname(__FILE__) + '/static'

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end


  get '/api' do
    puts "Sending a request to the adds-js sidecar at localhost:ENV['ADDS_JS_PORT']"
    response = Net::HTTP.get('localhost', '/', ENV['ADDS_JS_PORT'])
    puts "Received #{response} from the adds-js sidecar"
    response
  end

  post '/worker' do
    puts "SAVING #{params}"
    # logger.error "SAVING #{params}"
    # file = load_app.sitemap.find_resource_by_path payload[:path]
  end

  run! if app_file == $0
end
