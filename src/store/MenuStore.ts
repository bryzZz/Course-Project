import { makeAutoObservable } from "mobx";

import { RootStore } from "./RootStore";

export class MenuStore {
  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  // create = async () => {};
}
