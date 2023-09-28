import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CurrentPlan } from '../Response/currentPlans';
import { Plan } from '../Response/plans';
import { PlanService } from '../service/plan.service';
import { CurrentPlansService } from '../service/current-plans.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css'],
})
export class PlansComponent implements OnInit {
  public plansList: Plan[];
  public currentPlansList: CurrentPlan[];
  public currentUserPlansList: CurrentPlan[];
  public editPlan: Plan; //plan the user clicking on to add to their current plans
  public deletePlan: Plan; //delete plan when the user clicks delete

  public total = 0; //total Bill from all the prices from the active plans
  public totalDevices = 0; //total active devices
  public value;
  public open_error: boolean = false;
  public userName: String;

  constructor(
    private planService: PlanService,
    private currentPlanService: CurrentPlansService,
    private sharedService: SharedService
  ) {}

  public findsum(data) {
    this.value = data;
    this.total = 0; //rest back to zero to avoid double loop
    this.totalDevices = 0;
    for (let j = 0; j < data.length; j++) {
      this.total += this.value[j].price;
      this.totalDevices += this.value[j].deviceLimit;
    }
    //pass the device limit to the devices component
    this.sharedService.setDeviceLimit(this.totalDevices);
  }

  //////////////////////////////////////////////////////////////////////////////
  //use this to get the current user plans
  public getUserCurrentPlans(): void {
    this.currentPlanService
      .getUserCurrentPlans(this.sharedService.getUserId())
      .subscribe({
        next: (response: CurrentPlan[]) => {
          this.currentUserPlansList = response;
          this.findsum(this.currentUserPlansList);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error.message);
          alert(error.message);
        },
      });
  }
  //////////////////////////////////////////////////////////////////////////////

  public getCurrentPlans(): void {
    this.currentPlanService.getCurrentPlans().subscribe({
      next: (response: CurrentPlan[]) => {
        this.currentPlansList = response;
        this.findsum(this.currentPlansList);
      },
      error: (error: HttpErrorResponse) => {
        this.open_error = true;
      },
    });
    this.open_error = false;
  }

  public getPlans(): void {
    this.planService.getPlans().subscribe({
      next: (response: Plan[]) => {
        this.plansList = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  // use a Form to add a plan to the backend
  public onAddPlan(currentPlan: CurrentPlan): void {
    document.getElementById('add-plan-form').click();
    this.currentPlanService.addCurrentPlan(currentPlan).subscribe({
      next: (response: CurrentPlan) => {
        this.getCurrentPlans(); //call getPlans to re-update list
      },
      error: (error: HttpErrorResponse) => {
        this.open_error = true;
      },
    });
    this.open_error = false;
  }

  // use a Form to delete a plan to the backend
  public onDeletePlan(planId: number): void {
    document.getElementById('delete-plan-form').click();
    this.currentPlanService.deleteCurrentPlan(planId).subscribe({
      //void because service does not return anything
      next: (response: void) => {
        this.getCurrentPlans(); //call getPlans to re-update list
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  // use this to control which modal shows when a specific button is pressed
  public onOpenModal(plan: Plan, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-backdrop', 'static');
    button.setAttribute('data-bs-toggle', 'modal');

    //open the add modal if the user clicks the "add now" button
    if (mode === 'add') {
      this.editPlan = plan;
      button.setAttribute('data-bs-target', '#addModal');
    }
    // Open the Delete Modal if the user clicks the delete button
    if (mode === 'delete') {
      this.deletePlan = plan;
      button.setAttribute('data-bs-target', '#deletePlanModal');
    }
    container.appendChild(button);
    button.click();
  }

  async ngOnInit() {
    this.getPlans();
    this.getCurrentPlans();

    this.userName = this.sharedService.getUserName();

    //this.getUserCurrentPlans(); //unused call
  }
}
