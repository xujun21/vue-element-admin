<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-if="isEdit" v-loading="loading" style="margin-left: 10px;" @click="handelView(0)">
          验光记录
        </el-button>
        <el-button v-if="isEdit" v-loading="loading" style="margin-left: 10px;" @click="handelView(1)">
          购物记录
        </el-button>
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存提交
        </el-button>
        <el-button v-if="isEdit" v-loading="loading" style="margin-left: 10px;" @click="handelRecord">
          新建客服记录
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="客户姓名：" class="postInfo-container-item">
              <el-input v-model="postForm.nick_name" type="text" autosize placeholder="客户姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="会员等级：" class="postInfo-container-item">
              <el-select v-model="postForm.level" placeholder="请选择会员等级">
                <el-option
                  v-for="item in levelList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="isEdit" :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="会员卡号" class="postInfo-container-item">
              <el-input v-model="postForm.card_number" type="text" autosize placeholder="会员卡号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="联系电话" class="postInfo-container-item">
              <el-input v-model="postForm.tel" type="text" autosize placeholder="联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="会员手机号：" class="postInfo-container-item">
              <el-input v-model="postForm.mobile" type="text" autosize placeholder="会员手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="客户性别：" class="postInfo-container-item">
              <el-radio v-model="sex" label="1">男</el-radio>
              <el-radio v-model="sex" label="0">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="150px" label="大区：" class="postInfo-container-item">
              <el-select v-model="postForm.area" placeholder="选择注册/来源大区">
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
              <el-select v-model="postForm.city" placeholder="选择注册/来源事业部">
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
              <el-select v-model="postForm.shop" placeholder="选择注册/来源门店">
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
            <el-form-item label-width="150px" label="最近服务大区：" class="postInfo-container-item">
              <el-select v-model="postForm.last_area" placeholder="选择最近服务大区">
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
            <el-form-item label-width="150px" label="最近服务事业部：" class="postInfo-container-item">
              <el-select v-model="postForm.last_city" placeholder="选择最近服务事业部">
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
            <el-form-item label-width="150px" label="最近服务门店：" class="postInfo-container-item">
              <el-select v-model="postForm.last_shop" placeholder="选择最近服务门店">
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
            <el-form-item label-width="150px" label="注册渠道：" class="postInfo-container-item">
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

      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchMember } from '@/api/member'

const defaultForm = {
  status: 'draft',
  id: undefined,
  nick_name: '',
  area: ''
}

export default {
  name: 'MemberDetail',
  components: { Sticky },
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
      levelList: [{
        value: '-1',
        label: '潜客'
      }, {
        value: '0',
        label: '普通会员'
      }, {
        value: '1',
        label: '金卡会员'
      }, {
        value: '2',
        label: '铂金卡会员'
      }, {
        value: '3',
        label: '钻石卡会员'
      }],
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
        label: '客服注册'
      }, {
        value: '1',
        label: '门店注册'
      }, {
        value: '2',
        label: '线上注册'
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
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      console.log('id=' + id)
      fetchMember(id).then(response => {
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
      const title = '编辑会员'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.nick_name}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑会员'
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
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('提交失败!!')
          return false
        }
      })
    },
    handelView(p) {
      if (p === 0) {
        this.$router.push('/members/service_detail')
      } else {
        this.$router.push('/members/shopping_detail')
      }
    },
    handelRecord() {
      this.$router.push('/cic/records/create')
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
