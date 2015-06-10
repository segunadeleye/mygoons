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

  has_many :accepted_friend_requests, -> { where accepted: true }, class_name: "FriendRequest"
  has_many :unaccepted_friend_requests, -> { where accepted: false }, class_name: "FriendRequest"
  
  has_many :pending_friend_requests, -> { where accepted: false }, class_name: "FriendRequest", foreign_key: "sender_id"

  default_scope { where.not(invitation_accepted_at: nil) }
  # default_scope { where("created_at IS NULL") }
  # default_scope { where("active = 1") }

  scope :active, ->{ where(active: true).order(created_at: :DESC) }

  # scope :active, ->{ where.not(active: false, invitation_accepted_at: nil).order(created_at: :DESC) }
  # scope :registered, ->{ where.not(invitation_accepted_at: nil).order("active DESC") }
  scope :yet_to_accept_invitation, ->{ where(invitation_accepted_at: nil) }
  scope :inactive, ->{ where(active: false)}

  # users with unaccepted friend requests
  scope :with_unaccepted_friend_request_recieved, -> {
    joins(:friend_requests).merge(FriendRequest.unaccepted)
  }

  scope :with_unaccepted_friend_request_sent, -> {
    joins(:friend_requests).merge(FriendRequest.unaccepted)
  }

  # even though #pluck is a shortcut for #map, this will not work when #pluck is called
  # def name
  #   "I am #{super}"
  # end

  def my_friends_ids
    @friends_ids ||= friends.pluck(:id) + inverse_friends.pluck(:id)
  end

  def my_friends
    @friends ||= User.where(id: my_friends_ids) #=> returns an ActiveRecord_Relation
    # @friends ||= User.find(my_friends_ids) #=> returns an Array
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
