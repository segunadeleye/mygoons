Mygoons::Application.configure do
  config.middleware.insert_after(::Rack::Runtime, "::Rack::Auth::Basic", "Staging") do |u, p|
    [u, p] == ["username", "password"]
  end
end
