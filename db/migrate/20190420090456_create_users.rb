class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
    	t.string :first_name
      t.string :last_name
      t.string :email
      t.string :avatar
      t.text   :user_roles
      t.boolean   :deleted_flag, default: false
      t.datetime  :deleted_at
      t.timestamps
    end
  end
end
