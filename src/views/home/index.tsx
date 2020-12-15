import { Component, Vue } from "vue-property-decorator";

import "./index.scss";

@Component({
  name: "Home"
})
export default class Home extends Vue {
  protected render() {
    return (
      <section class="homepage">
        <el-card class="box-card">
          Student Leaderboard
        </el-card>
      </section>
    );
  }
}
