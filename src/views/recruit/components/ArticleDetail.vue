<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">

      <div class="createPost-main-container">
        <el-row>
          <!-- <Warning /> -->

          <el-col :span="24">
            <div class="postInfo-container">
              <el-row :span="24">
                <el-col :span="12">
                  <el-form-item label="工作名称:" class="postInfo-container-item">
                    <el-input v-model="postForm.name" />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label-width="80px" label="工作类别:" class="postInfo-container-item">
                    <el-select v-model="postForm.category" placeholder="请请选择工作类别">
                      <el-option v-for="item in categoryOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>

              <el-row :span="24">
                <el-col :span="12">
                  <el-form-item label="工作地点:" class="postInfo-container-item">
                    <el-input v-model="postForm.place" />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label-width="80px" label="工作性质:" class="postInfo-container-item">
                    <el-select v-model="postForm.nature" placeholder="请选择工作性质">
                      <el-option v-for="item in natureOptions" :key="item.key" :label="item.display_name" :value="item.key" />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-row>

            </div>
          </el-col>
        </el-row>

        <div>
          岗位职责：
        </div>

        <!-- <el-form-item label="岗位职责：">
          <el-input v-model="postForm.duty" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item> -->

        <el-form-item prop="duty" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.duty" :height="400" />
        </el-form-item>

        <div>
          工作要求：
        </div>
        <!-- <el-form-item label="工作要求：">
          <el-input v-model="postForm.requirement" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="请输入" />
        </el-form-item> -->
        <el-form-item prop="requirement" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.requirement" :height="400" />
        </el-form-item>

        <!-- <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload v-model="postForm.image_uri" />
        </el-form-item> -->
      </div>

      <el-button v-loading="loading" style="margin-left: 450px;margin-bottom: 50px;" type="success" @click="submitForm">
        发布
      </el-button>
      <!-- <el-button v-loading="loading" type="warning" @click="draftForm">
        取消
      </el-button> -->

    </el-form>
  </div>
</template>

<script>
import { createJob } from '@/api/new-job'
import Tinymce from '@/components/Tinymce'
// import Upload from '@/components/Upload/SingleImage3'
// import MDinput from '@/components/MDinput'
// import Sticky from '@/components/Sticky' // 粘性header组件
// import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
// import { searchUser } from '@/api/remote-search'
// import Warning from './Warning'
// import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './Dropdown'

const categoryOptions = [
  { key: '开发类', display_name: '开发类' },
  { key: '策划类', display_name: '策划类' },
  { key: '运营商务类', display_name: '运营商务类' },
  { key: '职能类', display_name: '职能类' },
  { key: '特招类', display_name: '特招类' }
]

const natureOptions = [
  { key: '全职', display_name: '全职' },
  { key: '兼职', display_name: '兼职' }
]

const defaultForm = {
  // status: 'draft',

  name: '',
  category: '',
  nature: '',
  place: '',
  duty: '',
  requirement: ''

  // title: '', // 文章题目
  // content: '', // 文章内容
  // content_short: '', // 文章摘要
  // source_uri: '', // 文章外链
  // image_uri: '', // 文章图片
  // display_time: undefined, // 前台展示时间
  // id: undefined,
  // platforms: ['a-platform'],
  // comment_disabled: false,
  // importance: 0
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce },
  // components: { Tinymce, Upload },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // const validateRequire = (rule, value, callback) => {
    //   if (value === '') {
    //     this.$message({
    //       message: rule.field + '为必传项',
    //       type: 'error'
    //     })
    //     callback(new Error(rule.field + '为必传项'))
    //   } else {
    //     callback()
    //   }
    // }
    // const validateSourceUri = (rule, value, callback) => {
    //   if (value) {
    //     if (validURL(value)) {
    //       callback()
    //     } else {
    //       this.$message({
    //         message: '外链url填写不正确',
    //         type: 'error'
    //       })
    //       callback(new Error('外链url填写不正确'))
    //     }
    //   } else {
    //     callback()
    //   }
    // }
    return {
      categoryOptions,
      natureOptions,
      postForm: Object.assign({}, defaultForm),
      loading: false,
      // userListOptions: [],
      rules: {
        name: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        image_uri: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ],
        source_uri: [
          { required: true, message: '此处不能为空', trigger: 'blur' }
        ]
        // image_uri: [{ validator: validateRequire }],
        // title: [{ validator: validateRequire }],
        // content: [{ validator: validateRequire }],
        // source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
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
          createJob(this.postForm).then(() => {
            // this.getList()
            // this.list.unshift(this.temp)
            // this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加工作成功',
              type: 'success',
              duration: 2000
            })
            // this.$router.push('new_job')
          })
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
    }
    // getRemoteUserList(query) {
    //   searchUser(query).then(response => {
    //     if (!response.data.items) return
    //     this.userListOptions = response.data.items.map(v => v.name)
    //   })
    // }
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
