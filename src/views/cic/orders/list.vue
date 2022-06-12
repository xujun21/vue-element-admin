<template>
  <div class="app-container">
    <el-form ref="listQuery" :model="listQuery">
      <el-form-item label="状态" label-width="100px" prop="status">
        <el-radio-group v-model="listQuery.status" @change="getList">
          <el-radio v-for="item in form.statusList" :key="item.value" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-col :span="3">
          <el-input v-model="listQuery.topic" placeholder="主题" style="width: 95%;" />
        </el-col>
        <el-col :span="2">
          <el-input v-model="listQuery.orderId" placeholder="编号" style="width: 95%;" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.memberId" placeholder="客户ID" style="width: 95%;" />
        </el-col>
        <el-col :span="2">
          <el-input v-model="listQuery.nickname" placeholder="客户名" style="width: 95%;" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="listQuery.phone" placeholder="客户手机号" style="width: 95%;" />
        </el-col>
        <el-col :span="2">
          <el-input v-model="listQuery.cicer" placeholder="坐席" style="width: 95%;" />
        </el-col>
        <el-col :span="4">
          <el-input v-model="listQuery.startTime" placeholder="受理时间" style="width: 95%;" />
        </el-col>
        <el-col :span="2">
          <el-button @click="getList">查询</el-button>
        </el-col>
      </el-form-item>

    </el-form>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编号" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.orderId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="主题">
        <template slot-scope="scope">
          <span>{{ scope.row.topic }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="处理状态" width="100px">
        <template slot-scope="{row}">
          <el-tag :type="row.statsus">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="门店名称" width="200px">
        <template slot-scope="scope">
          <span>宝岛眼镜{{ scope.row.shopName }}店</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户ID" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.memberId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="客户联系人(联系方式)">
        <template slot-scope="scope">
          <span>{{ scope.row.nickname }}<font color="blue">({{ scope.row.phone }})</font></span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="咨询通道">
        <template slot-scope="scope">
          <span>{{ scope.row.channel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="咨询问题类型">
        <template slot-scope="scope">
          <span>{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="坐席">
        <template slot-scope="scope">
          <span>{{ scope.row.cicer }}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="接收人(工号)">
        <template slot-scope="scope">
          <span>{{ scope.row.dealer }}({{ scope.row.dealerNo }})</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="受理时间">
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

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { OrdersList } from '@/api/remote-search'

export default {
  name: 'OrdersList',
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
        nickname: ''
      },

      form: {
        statusList: [
          {
            label: '所有',
            value: '',
            selected: false
          },
          {
            label: '待处理',
            value: 'todo',
            selected: true
          },
          {
            label: '处理中',
            value: 'doing',
            selected: false
          },
          {
            label: '已回复',
            value: 'replied',
            selected: false
          },
          {
            label: '待回访',
            value: 'to_recall',
            selected: false
          },
          {
            label: '已回访',
            value: 'recalled',
            selected: false
          },
          {
            label: '处理完毕',
            value: 'done',
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
      OrdersList(this.listQuery).then(response => {
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
