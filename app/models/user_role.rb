class UserRole < ApplicationRecord
	belongs_to :User
	belongs_to :role
end
