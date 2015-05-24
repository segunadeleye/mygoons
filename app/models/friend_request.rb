class FriendRequest < ActiveRecord::Base
  belongs_to :user
  belongs_to :sender, class_name: "User"

  scope :unaccepted, ->{ where(accepted: false) }
  scope :accepted, ->{ where(accepted: true) }

end
