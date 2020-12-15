import {
  VuexModule,
  Module,
  // Mutation,
  getModule
  // Action,
} from "vuex-module-decorators";
import store from "@/store";
import { IStudent } from "@/utils/types/app";

export interface IAppState {
  listStudent: IStudent[];
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public listStudent: IStudent[] = [];
}

export const AppStore = getModule(App);
