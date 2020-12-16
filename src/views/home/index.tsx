import { AppStore } from "@/store/modules/app";
import { Component, Vue } from "vue-property-decorator";

import "./index.scss";

export enum EStatus {
  All,
  Active,
  Completed
}

@Component({
  name: "Home"
})
export default class Home extends Vue {

  private selectDay = '30';

  private isActive = EStatus.All;

  private isLoading = true;

  private columns = [
    {
      type: 'index',
      prop: "id",
      label: "Rank",
      width: "60",
    },
    {
      prop: "name",
      label: "Name",
    },
    {
      prop: "progress",
      label: "Progress",
    },
    {
      prop: "didHomework",
      label: "Homeworks Done",
    },
    {
      prop: "avgResult",
      label: "Average Tests Result",
    },
  ]

  private get dataTable() {
    return AppStore.listStudent;
  }

  protected async mounted() {
    await AppStore.fetchListStudents();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected render() {
    return (
      <section class="homepage p-4 md:p-10">
        <el-card class="box-card">
          <div class="font-bold text-lg mb-2">Students Leaderboard</div>
          <div class="flex justify-between items-center flex-wrap">
            <div class="p-2 flex items-center bg-E8F3F8 w-full md:w-min text-center rounded">
              <el-button
                class={[this.isActive === EStatus.All ? 'text-white bg-5458FB' : 'px-2 bg-transparent border-0']}
              >All Students</el-button>
              <el-button
                class={[this.isActive === EStatus.Active ? 'text-white bg-5458FB' : 'px-2 bg-transparent border-0']}
              >Active</el-button>
              <el-button
                class={[this.isActive === EStatus.Completed ? 'text-white bg-5458FB' : 'px-2 bg-transparent border-0']}
              >Completed</el-button>
            </div>
            <div class="flex justify-between items-center w-full md:w-max">
              <div class="p-3 w-50">
                <el-input
                  prefix-icon="el-icon-search"
                  placeholder="Search Students"
                ></el-input>
              </div>
              <div class="w-50">
                <el-select vModel={this.selectDay} placeholder="Select">
                  <el-option
                    key="0"
                    label="All Time"
                    value="0">
                  </el-option>
                  <el-option
                    key="30"
                    label="Last 30 days"
                    value="30">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <el-table
            v-loading={this.isLoading}
            style={{width: '100%'}}
            data={this.dataTable}
            columns={this.columns}
          >
            {
              this.columns.map((column, index) => (
                <el-table-column
                  type={column.type}
                  prop={column.prop}
                  label={column.label}
                  width={column.width}
                ></el-table-column>
              ))
            }
          </el-table>
        </el-card>
      </section>
    );
  }
}
