class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
    	t.string   :name
			t.string   :status
			t.integer  :is_checked, :limit => 1, :default => AdminType::NO
			t.boolean   :deleted_flag, default: false
			# t.userstamps #For creator_id, updater_id
			t.timestamps
    end
  end
end
