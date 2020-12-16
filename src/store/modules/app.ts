import {
  VuexModule,
  Module,
  Mutation,
  getModule,
  Action
} from "vuex-module-decorators";
import store from "@/store";
import { IStudent } from "@/utils/types/app";

export interface IAppState {
  listStudent: IStudent[];
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  public listStudent: IStudent[] = [];

  @Mutation
  public SET_LIST_STUDENTS(list: IStudent[]) {
    console.log(list);
    this.listStudent = list;
  }

  @Action({ rawError: true })
  public async fetchListStudents(callback?: any) {
    // TODO: call services here!
    // FAKE data:
    const fakeData: IStudent[] = [];
    const TOTAL_RECORDS = 5;
    const LIST_FAKE_NAMES = [
      "Floyd Henry",
      "Marjorie Watson",
      "Ted Alexander",
      "Beth Howard",
      "Gladys Cooper"
    ];
    for (let index = 0; index < TOTAL_RECORDS; index++) {
      fakeData.push({
        rank: index + 1,
        id: `id_${Math.floor(Math.random() * 999999)}`,
        name: LIST_FAKE_NAMES[index],
        avatar: "string",
        dob: "string",
        progress: Math.floor(Math.random() * 100),
        totalHomework: 10,
        didHomework: Math.floor(Math.random() * 10),
        avgResult: Math.floor(Math.random() * 100)
      });
    }
    this.SET_LIST_STUDENTS(fakeData);
  }
}

export const AppStore = getModule(App);
