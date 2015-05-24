# Preview all emails at http://localhost:3000/rails/mailers/friend_request_notifier
class FriendRequestNotifierPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/friend_request_notifier/sent
  def sent
    FriendRequestNotifier.sent
  end

  # Preview this email at http://localhost:3000/rails/mailers/friend_request_notifier/accepted
  def accepted
    FriendRequestNotifier.accepted
  end

end
