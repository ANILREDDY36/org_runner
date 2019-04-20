class AvatarUploader < CarrierWave::Uploader::Base
	include CarrierWave::MiniMagick
	include CarrierWave::MimeTypes
	storage :file

	def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png pdf docx doc odt txt html)
  end
end