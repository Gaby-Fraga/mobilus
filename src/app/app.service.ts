import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private _httpClient: HttpClient) { }

  getCases(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('https://api.covid19api.com/country/brazil?from=2020-08-01T00:00:00Z&to=2020-01-31T00:00:00Z')
        .subscribe((response: any[]) => {
          resolve(response);
        }, reject);
    });
  }
}
