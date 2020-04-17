<template>
    <el-dialog :visible.sync="visible" append-to-body title="选择用户" :close-on-click-modal='false'>
     <span slot="" style="padding: 0">
         <el-container>
        <el-main>
          <el-container>
            <el-header style="height: auto;padding: 0">
              <el-input style="width:40%" size="mini"
                        placeholder="姓名" v-model="searchName" @keyup.enter.native="searchUser">
                <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
              </el-input>
            </el-header>
            <el-main style="padding: 0">
              <el-table size="mini" :data="data"
                        ref="userTable"
                        @selection-change="selectionChange">
                <el-table-column
                  type="selection"
                  :selectable="selectable"
                  width="55">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="username"
                  label="登录名">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别">
                </el-table-column>
              </el-table>
            </el-main>
            <el-footer>
              <el-pagination  small
                              layout="prev, pager, next" :current-page="currentPage"
                              @current-change="currentChange"
                              :page-size="pageSize" :total="total"></el-pagination>
            </el-footer>
          </el-container>
        </el-main>
        <el-aside width="30%">
          <el-tag v-for="user of users" :key="user.id"
                  closable
                  @close="handleClose(user)"
                  style="margin: 5px">
            {{user.name}}
          </el-tag>
        </el-aside>
      </el-container>
     </span>
      <span slot="footer">
        <el-button @click="visible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="submit" size="mini">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
import { getUserByPage } from './../api/user';
import store from '../store';

export default {
  name: 'UserDialogComponent',
  data() {
    return {
      data: [],
      visible: false,
      inited: false,
      pageSize: 20,
      total: 0,
      searchName: '',
      currentPage: 1,
      users: [],
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.init();
    },
    hide() {
      this.visible = false;
    },
    submit() {
      this.$emit('ok', this.getCheckedUsers());
      this.hide();
    },
    init() {
      if (this.inited === false) {
        this.searchUser();
        this.inited = true;
      }
    },
    currentChange(val) {
      this.currentPage = val;
      this.searchUser();
    },
    handleClose(user) {
      this.users.splice(this.users.indexOf(user), 1);
      for (let i = 0; i < this.data.length; i += 1) {
        if (this.data[i].id === user.id) {
          this.$refs.userTable.toggleRowSelection(this.data[i], false);
        }
      }
    },
    selectable(row) {
      return !row.disabled;
    },
    getCheckedUsers() {
      return this.users;
    },
    selectionChange(selection) {
      for (let i = 0; i < this.data.length; i += 1) {
        const index = this.users.findIndex(item => item.id === this.data[i].id);
        if (index > -1) {
          this.users.splice(index, 1);
        }
      }
      for (let i = 0; i < selection.length; i += 1) {
        if (this.users.findIndex(item => item.id === selection[i].id) === -1) {
          this.users.push(selection[i]);
        }
      }
    },
    async searchUser() {
      const result = await getUserByPage(this.currentPage, this.pageSize, this.searchName);
      if (result.status === 200) {
        this.data = result.data.rows.map((item) => {
          this.$set(item, 'disabled', item.id.toString() === store.getters.userInfo.id);
          return item;
        });
        this.total = result.data.total;
        this.$nextTick().then(() => {
          for (let i = 0; i < this.data.length; i += 1) {
            if (this.users.findIndex(item => item.id === this.data[i].id) > -1) {
              this.$refs.userTable.toggleRowSelection(this.data[i], true);
            }
          }
        });
      }
    },
  },
};
</script>

<style scoped>

</style>
