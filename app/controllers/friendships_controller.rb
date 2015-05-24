class FriendshipsController < ApplicationController

  def update
    invitee = User.accept_invitation!(invitation_token: params["user"][:invitation_token], password: params["user"][:password], name: params["user"][:name])
    # invitee = User.find_by_email(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   )
    inviter = User.find(invitee.invited_by_id)
    @friendship = inviter.friendships.build(friend_id: invitee.id)
    if @friendship.save
      flash[:notice] = "Friend Added"
      redirect_to root_url
    else
      flash[:alert] = "Friend not added"
      render "invitaion/edit"
    end
  end

  def destroy
    @friendship = current_user.friendships.find(params[:id])
    @friendship.destroy
    flash[:notice] = "Friendship destroyed"
    redirect_to root_url
  end
end
