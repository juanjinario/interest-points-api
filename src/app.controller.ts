import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('place')
  getAllPlaces() {
    return this.appService.findAllPlaces({});
  }

  @Get('place/:province')
  getAllPlacesByProvince(@Param('province') province: string) {
    return this.appService.findAllPlaces({ province });
  }
}
