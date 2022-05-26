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
    const topLeftCoords = { ...limitCoords['top-left'] };
    const topRightCoords = { ...limitCoords['top-right'] };
    let response = [];
    const rowPlaces = await this.getAllPlacesInRow({
      topLeftCoords,
      topRightCoords,
    });
    response = [...response, ...rowPlaces];
    return response;
  }

  async getAllPlacesInRow({ topLeftCoords, topRightCoords }): Promise<any[]> {
    const key = this.gmapKey;
    const minLongitude = 0.02; // value to traverse longitude
    let response = [];
    while (topLeftCoords.long < topRightCoords.long) {
      const location = Utils.coordsToString(topLeftCoords);
      const { results: apiResults } = await this.getPlacesByParams({
        key,
        location,
        radius: this.radius,
      });
      response = [...response, ...apiResults];
      topLeftCoords.long = topLeftCoords.long + minLongitude;
    }
    return response;
  }

  async getPlacesByParams({ key, location, radius, type = 'bus_station' }) {
    const url = `${this.baseUrl}?key=${key}&location=${location}&radius=${radius}&type=${type}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    console.log(data, location);
    return data;
  }
}
