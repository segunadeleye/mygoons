class FriendRequestNotifier < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.friend_request_notifier.sent.subject
  #
  def sent(sender, potential_friend)
    @sender = sender
    @potential_friend = potential_friend

    mail to: potential_friend.email, subject: "Friend Request from #{sender.name.capitalize}"
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.friend_request_notifier.accepted.subject
  #
  def accepted(sender, friend)
    @friend = friend
    @sender = sender

    mail to: sender.email, subject: "Friend Request Accepted."
  end
end
