class FriendRequestsController < ApplicationController

  def initiate
    potential_friend = User.find(params[:potential_friend_id])
    friend_request = potential_friend.friend_requests.build(sender_id: current_user.id)

    respond_to do |format|
      if friend_request.save
        FriendRequestNotifier.sent(current_user, potential_friend).deliver_now
        format.html { redirect_to root_url }
        format.js
      else
        flash[:alert] = "Friend request not sent"
        format.html { render root_url }
      end
    end
  end

  def accept
    sender = User.find(params[:sender_id])
    friendship = sender.friendships.build(friend_id: current_user.id)

    respond_to do |format|
      if friendship.save
        current_user.friend_requests.find_by(sender_id: sender.id).update_attributes(accepted: 1)
        FriendRequestNotifier.accepted(sender, current_user).deliver_now
        format.html { redirect_to root_url }
        format.js
      else
        flash[:alert] = "Acceptance failed"
        format.html { render friend_requests_all_url }
      end
    end
  end
end
