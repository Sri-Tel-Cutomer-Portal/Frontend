import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  deviceLimit: number;
  userId: any;
  userName: String;

  setDeviceLimit(data) {
    this.deviceLimit = data;
  }

  getDeviceLimit() {
    return this.deviceLimit;
  }

  setUserId(data) {
    this.userId = data;
  }

  getUserId() {
    return this.userId;
  }

  setUserName(data) {
    this.userName = data;
  }

  getUserName() {
    return this.userName;
  }
}
