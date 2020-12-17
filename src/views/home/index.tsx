import { AppStore } from "@/store/modules/app";
import { IStudent } from "@/utils/types/app";
import { Component, Vue, Watch } from "vue-property-decorator";
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

  private screenWidth = window.innerWidth;

  private get columns() {
    return this.screenWidth > 768
      ? [
          {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
            width: 100,
            className: "whitespace-nowrap",
            sorter: (a: IStudent, b: IStudent) => a.rank - b.rank,
            customRender: (value: number, record: IStudent) => (
              <div class="flex items-center justify-between">
                <div>{value}</div>
                {value <= 3 ? (
                  <img class="w-4" src={`/img/cup_${value}.svg`} />
                ) : null}
              </div>
            )
          },
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "25%",
            sorter: (a: IStudent, b: IStudent) => a.name.localeCompare(b.name),
            customRender: (value: string, record: IStudent) => (
              <div class="flex items-center justify-start">
                <a-avatar
                  src={
                    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }
                  class="border"
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
                  strokeColor={"#14C8B1"}
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
            width: 190,
            sorter: (a: IStudent, b: IStudent) => a.didHomework - b.didHomework,
            customRender: (value: string, record: IStudent) => (
              <div>
                <span class="font-semibold">{record.didHomework}</span>
                <span class="text-9FA5B7">/{value}</span>
              </div>
            )
          },
          {
            title: "Average tests result",
            dataIndex: "avgResult",
            key: "avgResult",
            align: "right",
            width: 230,
            sorter: (a: IStudent, b: IStudent) => a.avgResult - b.avgResult,
            customRender: (value: string) => (
              <div class={[Number(value) < 50 ? "text-EB5757" : "text-14C8B1"]}>
                {value}%
              </div>
            )
          }
        ]
      : [
          {
            title: "Rank",
            dataIndex: "rank",
            key: "rank",
            width: 90,
            sorter: (a: IStudent, b: IStudent) => a.rank - b.rank,
            customRender: (value: number, record: IStudent) => (
              <div class="flex justify-between">
                <div>{value}</div>
                <div>
                  {value <= 3 ? (
                    <img
                      class="w-4 ml-8 mt-10 absolute z-20"
                      src={`/img/cup_${value}.svg`}
                    />
                  ) : null}
                  <a-avatar
                    src={
                      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }
                    class="border z-10"
                  />
                </div>
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
                <div>
                  <a-progress
                    percent={record.progress}
                    strokeColor={"#14C8B1"}
                    showInfo={false}
                    class="mb-1"
                  />
                </div>
                <div class="custom-gray-sm">Homeworks done</div>
                <div class="custom-gray-sm">Average tests result</div>
              </div>
            )
          },
          {
            title: "Progress",
            dataIndex: "progress",
            key: "progress",
            align: "right",
            sorter: (a: IStudent, b: IStudent) => a.progress - b.progress,
            customRender: (value: string, record: IStudent) => (
              <div class="progress-min">
                <div> </div>
                <div class="text-14C8B1">{value}%</div>
                <div>
                  <span class="font-semibold">{record.didHomework}</span>
                  <span class="text-9FA5B7">/{value}</span>
                </div>
                <div
                  class={[Number(value) < 50 ? "text-EB5757" : "text-14C8B1"]}
                >
                  {record.avgResult}%
                </div>
              </div>
            )
          }
        ];
  }

  private get dataTable() {
    return AppStore.listStudent;
  }

  protected async mounted() {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
    await AppStore.fetchListStudents();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  protected destroyed() {
    window.removeEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  protected render() {
    return (
      <section class="homepage p-2 md:p-10 w-screen h-screen overflow-auto bg-E5E5E5">
        <a-card class="box-card shadow-md">
          <div class="font-semibold text-lg mb-4">Students Leaderboard {this.screenWidth}</div>
          <div class="flex justify-between items-center flex-wrap">
            <div class="px-1 flex justify-between items-center bg-E8F3F8 w-full md:w-auto text-center rounded my-2">
              <a-tabs>
                <a-tab-pane tab={"All Students"} key={EStatus.All}></a-tab-pane>
                <a-tab-pane tab={"Active"} key={EStatus.Active}></a-tab-pane>
                <a-tab-pane
                  tab={"Completed"}
                  key={EStatus.Completed}
                ></a-tab-pane>
              </a-tabs>
            </div>
            <div class="flex justify-between md:justify-end items-center w-full md:w-1/2 my-2">
              <div class="md:w-60 w-1/2 mr-1">
                <a-input
                  prefix={<img class="w-3" src={`/img/search.svg`} />}
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
              class={[this.screenWidth < 768 ? "min-table" : ""]}
            ></a-table>
          ) : null}
        </a-card>
      </section>
    );
  }
}
