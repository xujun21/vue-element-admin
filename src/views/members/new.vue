<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
          保存提交
        </el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="渠道：" class="postInfo-container-item">
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
            <el-form-item label-width="100px" label="客户姓名：" class="postInfo-container-item">
              <el-input v-model="postForm.content_short" type="text" autosize placeholder="客户姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="等级：" class="postInfo-container-item">
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
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="会员卡号" class="postInfo-container-item">
              <el-input v-model="postForm.card_number" type="text" autosize placeholder="会员卡号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="联系电话" class="postInfo-container-item">
              <el-input v-model="postForm.tel" type="text" autosize placeholder="联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="this.$route.params.id" :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="会员手机号：" class="postInfo-container-item">
              <el-input v-model="postForm.mobile" type="text" autosize placeholder="会员手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="客户性别：" class="postInfo-container-item">
              <el-radio v-model="sex" label="1">男</el-radio>
              <el-radio v-model="sex" label="0">女</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="8">
            <el-form-item label-width="100px" label="大区：" class="postInfo-container-item">
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
            <el-form-item label-width="100px" label="事业部：" class="postInfo-container-item">
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
            <el-form-item label-width="100px" label="门店：" class="postInfo-container-item">
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

      </div>
    </el-form>
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'

const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
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
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }
    return {
      levelList: [{
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
        label: '公众号'
      }, {
        value: '1',
        label: '会员小程序'
      }, {
        value: '2',
        label: '优选商城小程序'
      }],
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {}
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return (+new Date(this.postForm.display_time))
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
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
      fetchArticle(id).then(response => {
        this.postForm = response.data

        // just for test
        this.postForm.title += `   Article Id:${this.postForm.id}`
        this.postForm.content_short += `   Article Id:${this.postForm.id}`

        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = 'Edit Article'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
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
          console.log('error submit!!')
          return false
        }
      })
    },
    draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
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
