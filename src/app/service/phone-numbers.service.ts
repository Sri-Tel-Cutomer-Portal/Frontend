import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhoneNumber } from '../Response/phoneNumbers';

@Injectable({
  providedIn: 'root',
})
export class PhoneNumbersService {
  private apiServeUrl = environment.Url;

  constructor(private http: HttpClient) {}

  public getPhoneNumber(): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>(`${this.apiServeUrl}/phonenumber/all`);
  }

  public addPhoneNumber(phoneNumber: PhoneNumber): Observable<PhoneNumber> {
    return this.http.post<PhoneNumber>(
      `${this.apiServeUrl}/phonenumber/add`,
      phoneNumber
    );
  }

  public updatePhoneNumber(phoneNumber: PhoneNumber): Observable<PhoneNumber> {
    return this.http.put<PhoneNumber>(
      `${this.apiServeUrl}/phonenumber/update`,
      phoneNumber
    );
  }

  public deletePhoneNumber(phoneNumber: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServeUrl}/phonenumber/delete/${phoneNumber}`
    );
  }

  public getUserPhoneNumbers(userId: number): Observable<PhoneNumber[]> {
    return this.http.get<PhoneNumber[]>(
      `${this.apiServeUrl}/phonenumber/user/${userId}`
    );
  }
}
