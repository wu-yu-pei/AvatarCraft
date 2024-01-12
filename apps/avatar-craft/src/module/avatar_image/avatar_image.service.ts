import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AvatarImage } from './avatar_image.entity';
import { Repository } from 'typeorm';
import { UtilsService } from '../common/utils/utils.service';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AvatarImageService {
  constructor(
    @InjectRepository(AvatarImage)
    private readonly avatarImageRepository: Repository<AvatarImage>,
    @Inject(UtilsService) private readonly utilsService: UtilsService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async saveFileAndAddRecord(avatarId, files: any[]) {
    const fileSavePath = this.configService.get('fileSavePath');
    files.forEach(async (file) => {
      const fileName = `${avatarId}_${this.utilsService.getUUid()}`;
      const fileType = file.originalname.split('.')[1];

      const avatarImage = new AvatarImage();

      avatarImage.avatar_id = avatarId;
      avatarImage.status = 1;
      avatarImage.url = `${fileName}.${fileType}`;
      avatarImage.create_date = new Date();
      avatarImage.update_date = new Date();

      // 保存文件
      fs.writeFileSync(`${fileSavePath}/${fileName}.${fileType}`, file.buffer);

      await this.avatarImageRepository.save(avatarImage);
    });
  }
}
