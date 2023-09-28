import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentDevices } from '../Response/currentDevices';

@Injectable({
  providedIn: 'root',
})
export class CurrentDevicesService {
  private apiServeUrl = environment.Url;

  constructor(private http: HttpClient) {}

  public getCurrentDevices(): Observable<CurrentDevices[]> {
    return this.http.get<CurrentDevices[]>(
      `${this.apiServeUrl}/currentdevice/all`
    );
  }

  public addCurrentDevices(
    currentDevices: CurrentDevices
  ): Observable<CurrentDevices> {
    return this.http.post<CurrentDevices>(
      `${this.apiServeUrl}/currentdevice/add`,
      currentDevices
    );
  }

  public updateCurrentDevices(
    currentDevices: CurrentDevices
  ): Observable<CurrentDevices> {
    return this.http.put<CurrentDevices>(
      `${this.apiServeUrl}/currentdevice/update`,
      currentDevices
    );
  }

  public deleteCurrentDevices(CurrentDeviceId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServeUrl}/currentdevice/delete/${CurrentDeviceId}`
    );
  }

  public getUserCurrentPlans(userId: number): Observable<CurrentDevices[]> {
    return this.http.get<CurrentDevices[]>(
      `${this.apiServeUrl}/currentdevice/user/${userId}`
    );
  }
}
