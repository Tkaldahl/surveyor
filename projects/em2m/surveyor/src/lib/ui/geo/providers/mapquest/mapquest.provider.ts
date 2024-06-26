
import {of as observableOf, Observable} from 'rxjs';

import {map} from 'rxjs/operators';
import {ForwardGeocodeItem, ForwardGeocodeResult, GeoConfig, GeoProvider} from '../../geo.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ContextService} from '../../../../core/extension/context.service';

@Injectable()
export class MapquestGeoProvider implements GeoProvider {

  private mapquestKey: string;
  private baseUrl = 'https://www.mapquestapi.com/staticmap/v5/map';

  constructor(private http: HttpClient, private ctx: ContextService) {}

  init(config: GeoConfig) {
    const brand = this.ctx.getValue('brand:loaded');
    this.mapquestKey = brand?.settings?.maps?.mapquestKey || config?.properties?.mapquest?.consumerKey;
  }

  forwardGeocode(placeName: string): Observable<ForwardGeocodeResult> {
    if (this.mapquestKey) {
      const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${this.mapquestKey}&inFormat=kvp&outFormat=json&location=${placeName}`;
      return this.http.get(url).pipe(map((res: any) => {
        return {
          name: placeName,
          items: res.results.map((item: any) => {
            const loc = item.locations[0];

            return {
              center: [loc?.latLng?.lng, loc?.latLng?.lat],
              name: [loc?.street, loc?.adminArea5, loc?.adminArea3, loc?.adminArea1].filter( (val) => val?.length > 0).join(', ')
            };
          })
        };
      }));
    } else {
      return observableOf(null);
    }
  }

  staticImageUrl(lng: number, lat: number, zoom: number, width: number, height: number): Observable<string> {
    return observableOf(`${this.baseUrl}?key=${this.mapquestKey}&size=${width},${height}` +
      `&type=map&zoom=${zoom}&scalebar=false&traffic=false&center=${lat},${lng}`);
  }
}
