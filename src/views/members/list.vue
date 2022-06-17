<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.memberId" placeholder="会员卡号" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.openid" placeholder="客户openid" style="width: 180px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.nickname" placeholder="客户姓名" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.phone" placeholder="客户手机号" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <el-input v-model="listQuery.tel" placeholder="客户联系电话" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter" />&nbsp;
      <br>
      <el-date-picker v-model="listQuery.birthday" type="datetime" format="yyyy-MM-dd" placeholder="客户生日" />
      <el-date-picker v-model="listQuery.startTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="注册日期" />～
      <el-date-picker v-model="listQuery.endTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="注册日期" />&nbsp;

      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>&nbsp;
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新建客户/会员
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="客户姓名（联系电话）" width="180px">
        <template slot-scope="{row}">
          <router-link :to="'/members/edit/'+row.memberId">
            {{ row.nickname }}({{ row.tel }})
          </router-link>
        </template>
      </el-table-column>
      <el-table-column width="120px" align="center" label="客户手机号">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="会员卡号" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.memberId }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="客户openid">
        <template slot-scope="scope">
          <span>{{ scope.row.openid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册大区" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册事业部" width="100px">
        <template slot-scope="scope">
          <span>{{ scope.row.city }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="注册门店" width="200px">
        <template slot-scope="scope">
          <span>宝岛眼镜{{ scope.row.shopName }}店</span>
        </template>
      </el-table-column>
      <el-table-column width="100px" align="center" label="入会渠道">
        <template slot-scope="scope">
          <span>{{ scope.row.channel }}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" align="center" label="账户等级">
        <template slot-scope="scope">
          <span>{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="注册时间">
        <template slot-scope="scope">
          <span>{{ scope.row.regTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <router-link :to="'/members/edit/'+scope.row.memberId">
            <el-button type="primary" size="small" icon="el-icon-edit">查看/修改</el-button>
          </router-link>&nbsp;
          <router-link :to="'/members/edit/'+scope.row.memberId">
            <el-button type="primary" size="small">验光记录</el-button>
          </router-link>&nbsp;
          <router-link :to="'/members/edit/'+scope.row.memberId">
            <el-button type="primary" size="small">购物记录</el-button>
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

import { fetchList } from '@/api/member'

export default {
  name: 'MembersList',
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
      }
    }
  },
  created() {
    this.handleFilter()
  },
  methods: {
    handleFilter() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.$router.push('/members/create')
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
