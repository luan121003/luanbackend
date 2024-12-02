import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

export const CloudinaryConfig = {
  provide: 'Cloudinary',
  useFactory: () => {
    return cloudinary.config({
      cloud_name: 'dbvlf8qv0',
      api_key: '388669734682761',
      api_secret: '1HqqwP8LqqWC7Q7_zg5QCHK_QrU',
    });
  },
};
