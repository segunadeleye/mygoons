class UsersController < ApplicationController
  # before_action :is_user_active?, except: [:deactivate, :activate]
  before_action :authenticate_user!, except: [:deactivate, :activate]
  before_action :get_friends, only: [:home]
  before_action :get_suggestions, only: [:home]
  before_action :set_user, only: [:deactivate, :activate]

  def home
  end

  def upload
    image = params[:image]
    File.open(Rails.root.join('app', 'assets', 'images', image.original_filename), 'wb') do |file|
      file.write(image.read)
    end
    current_user.update_attribute(:image, image.original_filename)
    redirect_to root_url, notice: "Image successfully uploaded."
  end

  def deactivate
    respond_to do |format|
      if @user.update_attribute(:active, 0)
        format.html { redirect_to admins_home_url }
      else
        flash[:alert] = "User deactivation unsuccessful"
        format.html { redirect_to admins_home_url }
      end
    end
  end

  def activate
    respond_to do |format|
      if @user.update_attribute(:active, 1)
        format.html { redirect_to admins_home_url }
      else
        flash[:alert] = "User activation failed!"
        format.html { redirect_to admins_home_url }
      end
    end
  end

  private
    def get_friends
      @friends = current_user.my_friends
    end

    def get_suggestions
      suggested_friends_ids = []
      @friends.each do |friend|
        suggested_friends_ids += friend.my_friends_ids
      end
      @suggested_friends = User.where(id: (suggested_friends_ids - current_user.my_friends_ids - [current_user.id]).uniq)
    end

    def set_user
      @user = User.find(params[:id])
    end
end
