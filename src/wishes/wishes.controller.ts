import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { YandexGuard } from 'src/guards/yandex-guard';
import { LocalGuard } from 'src/guards/local-guard';
import { JwtGuard } from 'src/guards/jwt-guard';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('last')
  async findLast() {
    const wishes = await this.wishesService.findAll();

    return wishes[wishes.length-1]
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('top')
  async findTop() {
    const wishes = await this.wishesService.findAll();

    return wishes[0]
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto, @Req() req) {
    return this.wishesService.update(+id, updateWishDto, req.user.id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.wishesService.remove(+id, req.user.id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post(':id/copy')
  copy(@Param('id') id: string) {
    return this.wishesService.copy(+id)
  }
}
