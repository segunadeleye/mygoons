require 'test_helper'

class FriendRequestsControllerTest < ActionController::TestCase
  test "should get send" do
    get :send
    assert_response :success
  end

  test "should get accept" do
    get :accept
    assert_response :success
  end

end
