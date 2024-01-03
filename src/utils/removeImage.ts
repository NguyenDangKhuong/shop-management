import { v2 as cloudinary } from 'cloudinary'

import {
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINARY,
  CLOUD_NAME_CLOUDINARY
} from './constants'

const removeImage = (publicId: string) => {
  try {
    cloudinary.config({
      cloud_name: CLOUD_NAME_CLOUDINARY,
      api_key: API_KEY_CLOUDINARY,
      api_secret: API_SECRET_CLOUDINARY
    })
    cloudinary.uploader.destroy(publicId, function (error, result) {
      console.log(result, error)
    })
  } catch (err) {
    console.error(err)
  }
}

export default removeImage
