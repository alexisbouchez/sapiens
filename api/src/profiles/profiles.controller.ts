import {
  Controller,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ProfilesService } from './profiles.service'

@Controller()
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Put('/profiles/:id/avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  updateAvatar(
    @Param('id') id: string,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    return this.profilesService.uploadAvatar(id, avatar)
  }
}
