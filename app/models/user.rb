class User < ApplicationRecord
	# has_many :roles
	has_many :user_roles
	mount_uploader :image, ImageUploader
	serialize :meta_details
end
