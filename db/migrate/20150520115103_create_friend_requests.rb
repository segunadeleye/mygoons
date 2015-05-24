class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :user_id, null: false
      t.integer :sender_id, null: false
      t.integer :accepted, null: false, default: 0

      t.timestamps null: false
    end
  end
end
