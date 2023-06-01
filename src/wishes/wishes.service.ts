import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>
  ) {}
  create(createWishDto: CreateWishDto) {
    return this.wishRepository.create(createWishDto)
  }

  findAll() {
    return this.wishRepository.find();
  }

  findOne(id: number) {
    return this.wishRepository.findOneBy({
      id: id
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto, user_id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    if(wish && wish.owner.id === user_id) {
      return this.wishRepository.update(id, updateWishDto)
    }
    return null;
  }

  async remove(id: number, user_id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    if(wish && wish.owner.id === user_id) {
      return this.wishRepository.delete(id)
    }
    return null;
  }

  async copy(id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    return this.create(wish)
  }
}
