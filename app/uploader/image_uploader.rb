require 'carrierwave/processing/mini_magick'

class ImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  #has to have imagemagick installed, mini_magick is ruby interface for it, it is a c programm
  storage :grid_fs

  version :avatar do
    process :resize_to_fill => [60,60]
  end

  def store_dir
    "#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end