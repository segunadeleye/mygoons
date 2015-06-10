class FriendRequest < ActiveRecord::Base
  belongs_to :user
  belongs_to :sender, class_name: "User"
  
  # to change the primary key from user_id to sender_id
  # self.primary_key = "sender_id"

  scope :unaccepted, ->{ where(accepted: false) }
  scope :accepted, ->{ where(accepted: true) }

  def self.created_on_or_before(time)
    where("created_at <= ?", time)
  end
  # same as:
  # scope :created_on_or_before, ->(time) { where("created_at <= ?", time) }
  # the latter is the preferred option

end
