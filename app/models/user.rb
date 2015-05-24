class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :friendships
  has_many :friends, through: :friendships
  has_many :inverse_friendships, class_name: "Friendship", foreign_key: "friend_id"
  has_many :inverse_friends, through: :inverse_friendships, source: :user

  has_many :friend_requests
  has_many :senders, through: :friend_requests

  scope :active, ->{ where.not(active: false, invitation_accepted_at: nil) }
  scope :registered, ->{ where.not(invitation_accepted_at: nil).order("active DESC") }
  scope :yet_to_accept_invitation, ->{ where(invitation_accepted_at: nil) }
  scope :inactive, ->{ where(active: false)}

  def my_friends_ids
    @friends_ids ||= friends.pluck(:id) + inverse_friends.pluck(:id)
  end

  def my_friends
    @friends ||= User.where(id: my_friends_ids)
  end

  def active_for_authentication?
    super && account_active?
  end

  def account_active?
    active == 1
  end

  def inactive_message
    "Sorry, this account has been deactivated."
  end
end
