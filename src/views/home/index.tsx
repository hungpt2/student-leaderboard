import { AppStore } from "@/store/modules/app";
import { IStudent } from "@/utils/types/app";
import { Component, Vue } from "vue-property-decorator";
import "./index.scss";

export enum EStatus {
  All,
  Active,
  Completed
}

@Component({
  name: "students_leaderboard"
})
export default class StudentsLeaderboard extends Vue {
  private isActive = EStatus.All;

  private isLoading = true;

  private get screenWidth() {
    return window.innerHeight;
  }

  private get columns() {
    return this.screenWidth > 768 ? [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        width: 100,
        sorter: (a: IStudent, b: IStudent) => a.rank - b.rank,
        customRender: (value: number, record: IStudent) => (
          <div class="flex items-center justify-between">
            <div>{value}</div>
            {value <= 3 ? <img class="w-5" src={`/img/cup_${value}.svg`} /> : null}
          </div>
        )
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a: IStudent, b: IStudent) => a.name.localeCompare(b.name),
        customRender: (value: string, record: IStudent) => (
          <div class="flex items-center justify-start">
            <a-avatar
              src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"}
            />
            <div class="ml-2">{value}</div>
          </div>
        )
      },
      {
        title: "Progress",
        dataIndex: "progress",
        key: "progress",
        sorter: (a: IStudent, b: IStudent) => a.progress - b.progress,
        customRender: (value: string) => (
          <div class="flex items-center justify-start">
            <div class="mr-2 text-14C8B1">{value}%</div>
            <a-progress
              percent={value}
              strokeColor={'#14C8B1'}
              showInfo={false}
            />
          </div>
          
        )
      },
      {
        title: "Homework Done",
        dataIndex: "totalHomework",
        key: "totalHomework",
        align: "right",
        sorter: (a: IStudent, b: IStudent) => a.didHomework - b.didHomework,
        customRender: (value: string, record: IStudent) => (
          <div>
            <span class="font-bold">{record.didHomework}</span>
            <span class="text-gray-400">/{value}</span>
          </div>
        )
      },
      {
        title: "Average tests result",
        dataIndex: "avgResult",
        key: "avgResult",
        align: "right",
        sorter: (a: IStudent, b: IStudent) => a.avgResult - b.avgResult,
        customRender: (value: string) => (
          <div class={[Number(value) < 50 ? 'text-F07F80' : 'text-14C8B1']}>{value}%</div>
        )
      }
    ] : [
      {
        title: "Rank",
        dataIndex: "rank",
        key: "rank",
        width: 100,
        sorter: (a: IStudent, b: IStudent) => a.rank - b.rank,
        customRender: (value: number, record: IStudent) => (
          <div class="flex items-center justify-between">
            <div>{value}</div>
            {/* {value <= 3 ? <img class="w-5" src={`/img/cup_${value}.svg`} /> : null} */}
          </div>
        )
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a: IStudent, b: IStudent) => a.name.localeCompare(b.name),
        customRender: (value: string, record: IStudent) => (
          <div>
            <div>{value}</div>
            <div class="uppercase">Homeworks done</div>
            <div class="uppercase">Average tests result</div>
          </div>
        )
      },
      {
        title: "Progress",
        dataIndex: "progress",
        key: "progress",
        sorter: (a: IStudent, b: IStudent) => a.progress - b.progress,
        customRender: (value: string) => (
          <div class="flex items-center justify-start">
            <div class="mr-2 text-14C8B1">{value}%</div>
            <a-progress
              percent={value}
              strokeColor={'#14C8B1'}
              showInfo={false}
            />
          </div>
          
        )
      },
    ];
  }

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
      <section class="homepage p-4 md:p-10 w-screen h-screen overflow-auto bg-gray-200">
        <a-card class="box-card shadow-md">
          <div class="font-bold text-lg mb-4">Students Leaderboard</div>
          <div class="flex justify-between items-center flex-wrap">
            <div class="p-2 flex justify-between items-center bg-E8F3F8 w-full md:w-auto text-center rounded my-2">
              <a-button
                class={[
                  "px-4 py-2",
                  this.isActive === EStatus.All
                    ? "text-white bg-5458FB"
                    : "px-2 bg-transparent border-0"
                ]}
              >
                All Students
              </a-button>
              <a-button
                class={[
                  "px-4 py-2",
                  this.isActive === EStatus.Active
                    ? "text-white bg-5458FB"
                    : "px-2 bg-transparent border-0"
                ]}
              >
                Active
              </a-button>
              <a-button
                class={[
                  "px-4 py-2",
                  this.isActive === EStatus.Completed
                    ? "text-white bg-5458FB"
                    : "px-2 bg-transparent border-0"
                ]}
              >
                Completed
              </a-button>
            </div>
            <div class="flex justify-between md:justify-end items-center w-full md:w-1/2 my-2">
              <div class="md:w-60 w-1/2 mr-1">
                <a-input
                  prefix={<a-icon type="search" />}
                  placeholder="Search Students"
                  class="w-full"
                ></a-input>
              </div>
              <div class="md:w-32 w-1/2 ml-1">
                <a-select
                  defaultValue={"30"}
                  placeholder={"Select"}
                  class="w-full"
                >
                  <a-select-option key="0" value="0">
                    All Time
                  </a-select-option>
                  <a-select-option key="30" value="30">
                    Last 30 days
                  </a-select-option>
                </a-select>
              </div>
            </div>
          </div>
          {this.dataTable.length > 0 ? (
            <a-table
              loading={this.isLoading}
              pagination={false}
              dataSource={this.dataTable}
              columns={this.columns}
            ></a-table>
          ) : null}
        </a-card>
      </section>
    );
  }
}
