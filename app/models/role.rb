class Role < ApplicationRecord
	# belongs_to :user
	has_many :user_roles
	def Role.active_roles
		roles = where("is_checked=?", AdminType::NO)
		roles_arr = []
		if roles.present?
			roles.each do |role|
				roles_arr.push(["#{role.name}", role.id])
			end
		end
		roles_arr
	end
end
