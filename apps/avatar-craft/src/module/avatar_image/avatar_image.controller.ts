import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AvatarImageService } from './avatar_image.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('avatar-image')
export class AvatarImageController {
  constructor(
    @Inject(AvatarImageService)
    private readonly avatarImageService: AvatarImageService,
  ) {}

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(@UploadedFiles() files: Array<any>, @Body() body) {
    const { avatarId } = body;

    await this.avatarImageService.saveFileAndAddRecord(avatarId, files);

    return '上传成功';
  }
}
