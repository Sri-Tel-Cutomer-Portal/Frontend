import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../Response/plans';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private apiServeUrl = environment.Url;

  constructor(private http: HttpClient) {}

  public getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.apiServeUrl}/plan/all`);
  }

  public addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.apiServeUrl}/plan/add`, plan);
  }

  public updatePlan(plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiServeUrl}/plan/update`, plan);
  }

  public deletePlan(planId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/plan/delete/${planId}`);
  }
}
