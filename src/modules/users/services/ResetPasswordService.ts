import AppError from '@shared/errors/AppErro';
import { getCustomRepository } from 'typeorm';
import {hash} from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositries/UserTokensRepository';
import UsersRepository from '../typeorm/repositries/UsersRepository';
import { isAfter, addHours } from 'date-fns';


interface IRequest {
  token: string;
  password: string;

}


class ResetPasswordService {
  public async execute({token, password}: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

if (!userToken) {
  throw new AppError('User Token does not exist!');
}

  const user = await usersRepository.findById(userToken.user_id);

  if (!user) {
    throw new AppError('User does not exists.');
  }

  const tokenCreatedAt = userToken.created_at;
  const compareDate = addHours(tokenCreatedAt, 2);

  if (isAfter(Date.now(), compareDate)) {
    throw new AppError('Token expired!');
    }

    user.password = await hash(password, 8);

  }
}

export default ResetPasswordService;
