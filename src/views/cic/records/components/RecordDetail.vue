<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存记录
        </el-button>
        <el-button v-if="isEdit" v-loading="loading" style="margin-left: 10px;" @click="handelOrder">
          创建工单
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row v-if="isEdit" :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="ID" class="postInfo-container-item">
              <span>{{ this.id }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isEdit" :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="创建时间：" class="postInfo-container-item">
              <span>{{ postForm.createdTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="记录主题：" class="postInfo-container-item">
              <el-input v-model="postForm.topic" type="text" autosize placeholder="记录主题" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="咨询问题类型：" class="postInfo-container-item">
              <query-type />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="客户姓名：" class="postInfo-container-item">
              <el-input v-model="postForm.nick_name" type="text" autosize placeholder="客户姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="会员手机号：" class="postInfo-container-item">
              <el-input v-model="postForm.phone" type="text" autosize placeholder="会员手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="联系方式：" class="postInfo-container-item">
              <el-input v-model="postForm.tel" type="text" autosize placeholder="联系方式" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="大区：" class="postInfo-container-item">
              <el-select v-model="postForm.area" placeholder="选择所属大区">
                <el-option
                  v-for="item in areaList"
                  :key="item.vaule"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="事业部：" class="postInfo-container-item">
              <el-select v-model="postForm.city" placeholder="选择所属事业部">
                <el-option
                  v-for="item in cityList"
                  :key="item.vaule"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="门店：" class="postInfo-container-item">
              <el-select v-model="postForm.shop" placeholder="选择所属门店">
                <el-option
                  v-for="item in shopList"
                  :key="item.vaule"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="来源渠道：" class="postInfo-container-item">
              <el-select v-model="postForm.channel" placeholder="请选择来源渠道">
                <el-option
                  v-for="item in channelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="描述：" class="postInfo-container-item">
              <el-input v-model="postForm.desc" type="textarea" autosize placeholder="描述，最多500字" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchRecord } from '@/api/cic'
import QueryType from '@/components/QueryType'

const defaultForm = {
  status: 'draft',
  id: undefined,
  nick_name: '',
  area: ''
}

export default {
  name: 'RecordDetail',
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
    return {
      // typeList: [
      //   {
      //     value: '咨询',
      //     label: '咨询'
      //   },
      //   {
      //     value: '投诉',
      //     label: '投诉'
      //   },
      //   {
      //     value: '建议',
      //     label: '建议'
      //   }
      // ],
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
    console.log(this.isEdit)
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      console.log(id)
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
      fetchRecord(id).then(response => {
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
      const title = '编辑记录'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑记录'
      document.title = `${title} - ${this.id}`
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
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    handelOrder() {
      this.$router.push('/cic/orders/create')
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
