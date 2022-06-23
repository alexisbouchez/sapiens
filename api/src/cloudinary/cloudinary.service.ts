import { Injectable } from '@nestjs/common'
import { UploadApiResponse, v2 } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload_stream({ folder: '/avatars' }, (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        })
        .end(file.buffer)
    })
  }
}
