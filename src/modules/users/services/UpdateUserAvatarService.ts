import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import  UsersRepository from '../typeorm/repositries/UsersRepository';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';


interface IRequest {
  user_id: string;
  avatarFilename: string;

}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError ('User not found.');
    }

    if (user.avatar) {

      const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilepath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilepath);
      }

      }

      user.avatar = avatarFilename;

      await usersRepository.save(user);

      return user;

    }
}

export default UpdateUserAvatarService;
