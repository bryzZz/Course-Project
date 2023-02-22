import { makeAutoObservable } from "mobx";

import { UserStore } from "./UserStore";

export class RootStore {
  userStore = new UserStore(this);

  errorMessage: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setErrorMessage(value: string | null) {
    this.errorMessage = value;
  }
}
