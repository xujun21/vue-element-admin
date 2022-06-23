<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar ' + postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存工单
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row :span="24">
          <el-col :span="10">
            <el-row v-if="isEdit">
              <el-col>
                <el-form-item label-width="150px" label="ID" class="postInfo-container-item">
                  <span>{{ this.id }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="主题：" class="postInfo-container-item">
                  <el-input v-model="postForm.topic" type="text" autosize placeholder="主题来源于业务记录" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="描述：" class="postInfo-container-item">
                  <el-input v-model="postForm.desc" type="textarea" autosize placeholder="描述来源于业务记录" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="咨询问题类型：" class="postInfo-container-item">
                  <query-type placeholder="咨询问题类型来源于业务记录" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="客户姓名：" class="postInfo-container-item">
                  <el-input v-model="postForm.nick_name" type="text" autosize placeholder="客户姓名" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="会员手机号：" class="postInfo-container-item">
                  <el-input v-model="postForm.phone" type="text" autosize placeholder="会员手机号" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="大区：" class="postInfo-container-item">
                  <el-select v-model="postForm.area" placeholder="选择所属大区">
                    <el-option v-for="item in areaList" :key="item.vaule" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="事业部：" class="postInfo-container-item">
                  <el-select v-model="postForm.city" placeholder="选择所属事业部">
                    <el-option v-for="item in cityList" :key="item.vaule" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="门店：" class="postInfo-container-item">
                  <el-select v-model="postForm.shop" placeholder="选择所属门店">
                    <el-option v-for="item in shopList" :key="item.vaule" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="处理状态：" class="postInfo-container-item">
                  <el-select v-model="postForm.status" placeholder="请选择处理状态">
                    <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="优先级：" class="postInfo-container-item">
                  <el-radio v-model="postForm.level" label="1">高</el-radio>
                  <el-radio v-model="postForm.level" label="2">中</el-radio>
                  <el-radio v-model="postForm.level" label="3">低</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="咨询渠道：" class="postInfo-container-item">
                  <el-select v-model="postForm.channel" placeholder="请选择咨询渠道">
                    <el-option v-for="item in channelList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label-width="150px" label="对接人：" class="postInfo-container-item">
                  <el-select v-model="postForm.receiver" filterable placeholder="请选择对接人">
                    <el-option v-for="item in receiverList" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-if="isEdit" :span="14" class="createPost-log-container">
            <el-tag>日志</el-tag>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="180" />
              <el-table-column prop="name" label="操作者" width="120" />
              <el-table-column prop="action" label="动作" width="120" />
              <el-table-column prop="content" label="内容" />
            </el-table>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchOrder } from '@/api/cic'
import QueryType from '@/components/QueryType'

const defaultForm = {
  status: '待处理',
  id: undefined,
  nick_name: '',
  area: ''
}

export default {
  name: 'OrderDetail',
  components: { Sticky, QueryType },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      console.log('asdf')
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    const logItem = [{
      date: '2022-06-15 11:32:23',
      name: '客服主管',
      action: '关闭工单',
      content: '【工单状态变为“处理完毕”】'
    }, {
      date: '2022-06-14 13:31:41',
      name: '客服小李',
      action: '已回访',
      content: '回访用户，用户表示满意。【工单状态变为“待回访”】'
    }, {
      date: '2022-06-14 13:31:41',
      name: '客服小李',
      action: '待回访',
      content: '修改工单状态【工单状态变为“待回访”】'
    }, {
      date: '2022-06-14 12:31:01',
      name: '张小二',
      action: '回复',
      content: '用户已经沟通完成，反馈用户1000积分作为补偿。【工单状态变为“已回复”】'
    }, {
      date: '2022-06-12 15:30:00',
      name: '张小二',
      action: '查看',
      content: '【工单状态变为“已查看”】'
    }, {
      date: '2022-06-12 10:45:20',
      name: '客服小李',
      action: '指派',
      content: '指派大南区广州事业部宝岛眼镜百信店张小二处理任务。【工单状态变为“处理中”】'
    }, {
      date: '2022-06-12 10:45:20',
      name: '客服小李',
      action: '创建',
      content: '创建了工单#77889'
    }]
    return {
      tableData: logItem,
      statusList: [
        {
          label: '待处理',
          value: 'todo',
          selected: true
        },
        {
          label: '已查看',
          value: 'viewed',
          selected: false
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
      ],
      areaList: [{
        value: '0',
        label: '华东区'
      }, {
        value: '1',
        label: '大南区'
      }],
      cityList: [{
        value: '0',
        label: '上海'
      }, {
        value: '1',
        label: '南京'
      }],
      shopList: [{
        value: '0',
        label: '真北路视光中心店'
      }, {
        value: '1',
        label: '三林印象城店'
      }],
      sex: '1',
      channelList: [{
        value: '0',
        label: '400电话'
      }, {
        value: '1',
        label: '企业微信'
      }, {
        value: '2',
        label: '微信客服'
      }],
      receiverList: [{
        value: 10000,
        label: '10000 店员张三'
      }, {
        value: 10001,
        label: '10001 店员Lisa'
      }, {
        value: 10002,
        label: '10002 店长Tim'
      }, {
        value: 10003,
        label: '10003 李老板'
      }],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        nick_name: [{ validator: validateRequire, trigger: 'blur' }],
        area: [{ validator: validateRequire }]
      },
      tempRoute: {}
    }
  },
  computed: {
  },
  created() {
    console.log('this.isEdit=' + this.isEdit)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
      this.id = id
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      console.log('id=' + id)
      fetchOrder(id).then(response => {
        this.postForm = response.data

        // // just for test
        // this.postForm.title += `   Article Id:${this.postForm.id}`
        // this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑工单'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.nick_name}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑工单'
      document.title = `${title} - ${this.postForm.nick_name}`
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }

    .createPost-log-container {
      padding: 0px 40px;
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
