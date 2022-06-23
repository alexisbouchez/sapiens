import { v2 } from 'cloudinary'
import { CLOUDINARY } from './constants'

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): void => {
    v2.config({
      cloud_name: 'dh7w3nkkz',
      api_key: '919887883495443',
      api_secret: 't5nwix74Jbxk5qIsmB1mYt7mGxI',
    })
  },
}
