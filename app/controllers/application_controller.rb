class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_permitted_params, if: :devise_controller?

  protected
    def set_permitted_params
      devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password, :password_confirmation) }
    end

    def after_sign_out_path_for(resource)
      stored_location_for(resource) ||
      if resource.is_a?(Admin)
        new_admin_session_url
      else
        new_user_session_url
      end
    end

    def after_sign_in_path_for(resource)
      stored_location_for(resource) ||
      if resource.is_a?(Admin)
        admins_home_url
      else
        users_home_url
      end
    end
end

