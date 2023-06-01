import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { YandexGuard } from 'src/guards/yandex-guard';
import { LocalGuard } from 'src/guards/local-guard';
import { JwtGuard } from 'src/guards/jwt-guard';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly wishesService: WishesService
  ) {}

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId)

    if(wish && wish.price <= wish.raised){
      return null
    }

    if(wish && wish.owner.id !== req.user.id) {
      return this.offersService.create(createOfferDto)
    }
    return null
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
