import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CurrentPlan } from '../Response/currentPlans';

@Injectable({
  providedIn: 'root',
})
export class CurrentPlansService {
  private apiServeUrl = environment.Url;

  constructor(private http: HttpClient) {}

  public getCurrentPlans(): Observable<CurrentPlan[]> {
    return this.http.get<CurrentPlan[]>(`${this.apiServeUrl}/currentplan/all`);
  }

  public addCurrentPlan(currentPlan: CurrentPlan): Observable<CurrentPlan> {
    return this.http.post<CurrentPlan>(
      `${this.apiServeUrl}/currentplan/add`,
      currentPlan
    );
  }

  public updateCurrentPlan(currentPlan: CurrentPlan): Observable<CurrentPlan> {
    return this.http.put<CurrentPlan>(
      `${this.apiServeUrl}/currentplan/update`,
      currentPlan
    );
  }

  public deleteCurrentPlan(currentPlanId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiServeUrl}/currentplan/delete/${currentPlanId}`
    );
  }

  public getUserCurrentPlans(userId: number): Observable<CurrentPlan[]> {
    return this.http.get<CurrentPlan[]>(
      `${this.apiServeUrl}/currentplan/user/${userId}`
    );
  }
}
