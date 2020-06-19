ENV['RACK_ENV'] ||= 'development'

require 'rubygems'
require 'sinatra/base'
# require 'sinatra/reloader'
require 'json'
require 'net/http'
# require 'logger'
require 'set'

Bundler.require :default, ENV['RACK_ENV'].to_sym

class AppServer < Sinatra::Base

  # set :logger, Logger.new(STDOUT)

  # configure :development do
  #   register Sinatra::Reloader
  # end

  # also_reload 'app_server.rb'
  # after_reload do
  #   puts 'reloaded'
  # end

  set :public_folder, File.dirname(__FILE__) + '/static'

  workers = {}
  WORKER_TTL = 10

  get '/' do
    send_file File.join(settings.public_folder, 'index.html')
  end


  get '/api' do
    workers.delete_if { |_, t| Time.now.to_i - t > WORKER_TTL }

    puts "API Registered Workers: #{workers}"


    content_type :json
    {
      ads: workers.count,
      lemonade: "green"

    }.to_json

    # puts "Sending a request to the adds-js sidecar at localhost:ENV['ADDS_JS_PORT']"
    # response = Net::HTTP.get('localhost', '/', ENV['ADDS_JS_PORT'])
    # puts "Received #{response} from the adds-js sidecar"
    # response
  end

  get '/register_worker' do

    worker_uuid = params[:uuid]

    workers[worker_uuid] = Time.now.to_i

    workers.delete_if { |_, t| Time.now.to_i - t > WORKER_TTL }
    puts "Registered Workers: #{workers}"

  end

  def prune_workers

  end
  run! if app_file == $0
end
