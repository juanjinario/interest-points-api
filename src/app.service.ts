import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { limitCoords } from './data';
import Utils from './helpers/utils';

@Injectable()
export class AppService {
  gmapKey = '%20AIzaSyCjJLtjmrhwSmSCTLPH-Wi4nGsY_Yx8Ogw' as const;
  baseUrl =
    'https://maps.googleapis.com/maps/api/place/textsearch/json' as const;
  radius = 1110 as const; // Distance between 0.01 latitude/longitude

  constructor(private httpService: HttpService) {}

  getHello(): string {
    return 'Hello to interest points api!';
  }

  async findAllPlaces({ query = 'bus station' }): Promise<any> {
    const bottomLeftCoords = { ...limitCoords['bottom-left'] };
    const minLatitude = 0.02; // value to traverse latitude
    const topLeftCoords = { ...limitCoords['top-left'] };
    const topRightCoords = { ...limitCoords['top-right'] };
    const initLatitude = topLeftCoords.lat;
    let response = [];
    while (topLeftCoords.lat > bottomLeftCoords.lat) {
      const rowPlaces = await this.getAllPlacesInRow({
        topLeftCoords,
        topRightCoords,
        query,
      });
      response = [...response, ...rowPlaces];
      topLeftCoords.lat = topLeftCoords.lat - minLatitude;
    }
    topLeftCoords.lat = initLatitude;
    return response;
  }

  async getAllPlacesInRow({
    query,
    topLeftCoords,
    topRightCoords,
  }): Promise<any[]> {
    const initLong = topLeftCoords.long;
    const key = this.gmapKey;
    const minLongitude = 0.02; // value to traverse longitude
    let response = [];
    while (topLeftCoords.long < topRightCoords.long) {
      const location = Utils.coordsToString(topLeftCoords);
      const { results: apiResults } = await this.getPlacesByParams({
        key,
        location,
        radius: this.radius,
        query,
      });
      this.addNoDuplicatesPlacesToList({
        placeList: response,
        newPlaces: apiResults,
      });
      topLeftCoords.long = topLeftCoords.long + minLongitude;
    }
    topLeftCoords.long = initLong;
    return response;
  }

  // When it is a nearbysearch a type parameter is required
  async getPlacesByParams({ key, location, radius, query = 'bus station' }) {
    const url = `${this.baseUrl}?key=${key}&location=${location}&radius=${radius}&query=${query}`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  addNoDuplicatesPlacesToList({ placeList, newPlaces }) {
    newPlaces.forEach((newPlace) => {
      if (!this.isPlaceInList({ list: placeList, newPlace })) {
        placeList.push(newPlace);
      }
    });
  }

  isPlaceInList({ list, newPlace }): boolean {
    const index = list.findIndex(
      (listPlace) =>
        listPlace.geometry?.location?.lat === newPlace.geometry?.location?.lat &&
        listPlace.geometry?.location?.lng === newPlace.geometry?.location?.lng,
    );
    return index >= 0 ? true : false;
  }
}
