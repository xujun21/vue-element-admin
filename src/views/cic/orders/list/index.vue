<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.topic" placeholder="主题" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.orderId" placeholder="编号" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.memberId" placeholder="客户ID" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.nickname" placeholder="客户名" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.phone" placeholder="客户手机号" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.cicer" placeholder="坐席" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-select v-model="listQuery.status" placeholder="状态" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in form.statusList" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>&nbsp;
      <el-date-picker v-model="listQuery.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="受理起始时间" />&nbsp;
      <el-date-picker v-model="listQuery.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="受理结束时间" />&nbsp;

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>&nbsp;
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新建工单
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-document" @click="handleExport">
        导出工单
      </el-button>
    </div>

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
          <router-link :to="'/cic/orders/edit/'+scope.row.orderId">
            <el-button type="primary" size="small" icon="el-icon-edit">处理</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="handleFilter"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

import { fetchOrdersList } from '@/api/cic'
import { Dialog } from 'element-ui'

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
      fetchOrdersList,
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
    this.handleFilter()
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      fetchOrdersList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$router.push('/cic/orders/create')
    },
    handleExport() {
      this.listLoading = true
      this.$alert('开始导出工单，工单要包含大区、事业部、门店信息', '导出工单', {
        confirmButtonText: '确定',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${ action }`
          // });
          this.listLoading = false
        }
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
