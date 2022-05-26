import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { limitCoords } from './data';
import Utils from './helpers/utils';

@Injectable()
export class AppService {
  gmapKey = '%20AIzaSyCjJLtjmrhwSmSCTLPH-Wi4nGsY_Yx8Ogw' as const;
  baseUrl =
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json' as const;
  radius = 1110 as const; // Distance between 0.01 latitude/longitude

  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello to interest points api!';
  }

  async findAllPlaces({ type = 'bus_station' }): Promise<any> {
    const key = this.gmapKey;
    const location = Utils.coordsToString(limitCoords['top-left']);
    return await this.getPlacesByCoord({ key, location, radius: this.radius });
  }

  async getPlacesByCoord({ key, location, radius, type = 'bus_station' }) {
    const url = `${this.baseUrl}?key=${key}&location=${location}&radius=${radius}&type=${type}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log(data);
    return data;
  }
}
