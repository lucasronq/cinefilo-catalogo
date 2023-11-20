import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.createOne(createUserDto);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  findById(id: number) {
    return this.usersRepository.findById(id);
  }
}
