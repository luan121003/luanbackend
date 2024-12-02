import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary.config';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteById(folderId: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_resources_by_prefix(
        folderId,
        { invalidate: true },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  deleteFolder(folder: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.api.delete_folder(
        folder,
        { invalidate: true },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  deleteImage(publicId: string): Promise<CloudinaryResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}