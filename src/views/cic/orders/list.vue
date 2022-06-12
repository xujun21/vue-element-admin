<template>
  <div class="app-container">
    <el-form ref="listQuery" :model="listQuery">
      <el-form-item label="渠道" label-width="100px" prop="sttusCodes">
        <el-radio-group v-model="listQuery.channel" @change="getList">
          <el-radio v-for="item in form.channelList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-col :span="4">
          <el-input v-model="listQuery.msg" placeholder="内容关键字" style="width: 95%;" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.memberId" placeholder="会员ID" style="width: 95%;" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.nickname" placeholder="昵称" style="width: 95%;" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.phone" placeholder="手机号" style="width: 95%;" />
        </el-col>
        <el-col :span="2">
          <el-button @click="getList">查询</el-button>
        </el-col>
      </el-form-item>

    </el-form>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="会话ID" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.chatid }}</span>
        </template>
      </el-table-column>
      <el-table-column width="400px" align="center" label="内容(未读条数)">
        <template slot-scope="scope">
          <span>{{ scope.row.msg }}({{ scope.row.msgCnt }})</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="渠道" width="100px">
        <template slot-scope="{row}">
          <el-tag :type="row.channel">
            {{ row.channel }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员ID" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.memberId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="昵称">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="发起时间">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="onDeal(scope.row.chatid)">接单处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
      @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { chatsList } from '@/api/remote-search'

export default {
  name: 'ChatsList',
  components: { Pagination },
  filters: {
    //
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        memberId: '',
        nickname: '',
        parentType: ''
      },

      form: {
        channelList: [
          {
            label: '所有',
            value: '',
            selected: true
          },
          {
            label: '小程序',
            value: 'xcx',
            selected: false
          },
          {
            label: '公众号',
            value: 'public',
            selected: false
          }
        ]
      },
      dialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      chatsList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onDeal(chatid) {
      this.$confirm('进入会话ID为' + chatid + '的会话窗口', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        this.promptCode(chatid)
      }).catch(() => {
        /*
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        */
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}

.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>


