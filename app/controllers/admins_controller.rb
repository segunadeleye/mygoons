class AdminsController < ApplicationController
  before_action :authenticate_admin!

  def after_sign_out_path_for(resource)
    new_admin_session_url
  end

  def after_sign_in_path_for(resource)
    admins_home
  end

  def home
    @users = User.registered
  end
end
