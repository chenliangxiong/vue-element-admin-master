<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="姓名"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.position"
        placeholder="职位"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option
          v-for="item in importanceOptions"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-select
        v-model="listQuery.department"
        placeholder="部门"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        查找
      </el-button>
      <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button> -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        下载
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey = tableKey + 1"
      >
        显示审核人
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="工号"
        prop="work_num"
        sortable="custom"
        align="center"
        min-width="90px"
        :class-name="getSortClass('work_num')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.work_num }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Title" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.title }}</span>
          <el-tag>{{ row.type | typeFilter }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="姓名" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="年龄" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="部门" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="业绩" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.achievement }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="权限" min-width="85px" align="center">
        <template slot-scope="{ row }">
          <svg-icon
            v-for="n in +(6 - row.roles)"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="Readings" align="center" width="95">
        <template slot-scope="{row}">
          <span v-if="row.pageviews" class="link-type" @click="handleFetchPv(row.pageviews)">{{ row.pageviews }}</span>
          <span v-else>0</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="状态" class-name="status-col" min-width="80px">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column
        v-if="showReviewer"
        label="审核人"
        min-width="60px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        min-width="150px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改权限
          </el-button>
          <el-button
            v-show="row.status == '已激活'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, '已锁定')"
          >
            锁定
          </el-button>
          <el-button
            v-show="row.status == '已锁定'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row, '已激活')"
          >
            解除锁定
          </el-button>
          <el-button
            size="mini"
            @click="handleModifyStatus(row, '未激活')"
          >
            取消激活
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      <!-- </el-table-column> -->
      </el-table-column></el-table>

    <!-- 修改 -->

    <pagination
      v-show="total > 0"
      :page-sizes="[1,5,10, 200, 300, 400]"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.list_rows"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <!-- <el-form-item label="Type" prop="type">
          <el-select v-model="temp.type" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="Date" prop="timestamp">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
        </el-form-item>
        <el-form-item label="Title" prop="title">
          <el-input v-model="temp.title" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="temp.status" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="权限">
          <el-rate
            v-model="temp.roles"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:8px;"
          />
        </el-form-item>
        <!-- <el-form-item label="Remark">
          <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" placeholder="Please input" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <!-- reading的链接 -->

    <!-- <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog> -->
    <!-- </el-table> -->
  </div>
</template>

<script>
// import { getWorkNum } from '@/utils/auth'
import { achievementsList, updateRoles, updateStatus } from '@/api/achievements'
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '经理', display_name: '经理层' },
  { key: '计算机部', display_name: '计算机部' }
  // { key: 'CN', display_name: 'China' },
  // { key: 'US', display_name: 'USA' },
  // { key: 'JP', display_name: 'Japan' },
  // { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  // 过滤器
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        list_rows: 10,
        name: undefined,
        position: undefined,
        department: undefined,
        importance: undefined,
        title: undefined,
        type: undefined
        // sort: '+id'
      },
      importanceOptions: ['管理员', '普通员工'],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published',
        roles: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '添加'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    test() {
      console.log(1234)
    },
    getList() {
      this.listLoading = true
      achievementsList(this.listQuery).then(res => {
        // console.log(res.data[1])
        res.data.data.forEach(function(e) {
          // console.log(e.status)
          if (e.status === 1) {
            e.status = '已激活'
          } else if (e.status === 0) {
            e.status = '未激活'
          } else {
            e.status = '已锁定'
          }
        })
        // console.log(res.data)
        this.list = res.data.data
        this.total = res.data.total
        // console.log(res.data.total)

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      // row = Object.row
      row.status = status
      console.log(row.status)
      // console.log(status)

      // const tempData = Object.assign({}, this.temp)
      // console.log(tempData)
      // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
      updateStatus(row).then(() => {
        console.log('sldfk')
        this.getList()
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '修改权限成功',
          type: 'success',
          duration: 2000
        })
      })
      // updateStatus(row).then(() => {
      //   this.getList()

      //   const index = this.list.findIndex(v => v.id === this.temp.id)
      //   this.list.splice(index, 1, this.temp)
      //   this.dialogFormVisible = false
      //   this.$notify({
      //     title: 'Success',
      //     message: '修改权限成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      // })

      // this.$message({
      //   message: '操作成功',
      //   type: 'success'
      // })
      // console.log(row.status) // 0
      // console.log(status) // 已激活
      // row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        work_num: undefined,
        importance: 1,
        name: '',
        age: '',
        sex: '',
        position: '',
        department: '',

        // timestamp: new Date(),
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    // createData() {
    //   console.log('sdlfjsldfjslkdf')
    //   return new Promise((resolve, reject) => {
    //     usersList({ work_num: getWorkNum() })
    //       .then(response => {
    //         this.$notify({
    //           title: '成功',
    //           message: '发送成功',
    //           type: 'success'
    //         })
    //         resolve()
    //       })
    //       .catch(error => {
    //         console.log('发送失败')
    //         reject(error)
    //       })
    //   })
    // this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
    // this.temp.author = 'vue-element-admin'
    // createArticle(this.temp).then(() => {
    //   this.list.unshift(this.temp)
    //   this.dialogFormVisible = false
    //   this.$notify({
    //     title: 'Success',
    //     message: 'Created Successfully',
    //     type: 'success',
    //     duration: 2000
    //   })
    // })
    // },
    handleUpdate(row) {
      // 知识点：Object.assign方法用于对象的合并，源对象的所有可枚举属性，复制到目标对象
      this.temp = Object.assign({}, row) // copy obj
      this.temp.roles = 6 - this.temp.roles
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      // console.log(123)
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)

          console.log(tempData)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateRoles(tempData).then(() => {
            this.getList()

            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '修改权限成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名']
        const filterVal = [
          'name'
          // 'title',
          // 'type',
          // 'importance',
          // 'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
