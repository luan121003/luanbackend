import { Module } from '@nestjs/common';

import { CloudinaryConfig } from 'src/cloudinary/cloudinary.config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  providers: [CloudinaryService, CloudinaryConfig],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
