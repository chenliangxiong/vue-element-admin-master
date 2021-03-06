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
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      class="edit"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="ID"
        prop="id"
        sortable="custom"
        align="center"
        min-width="90px"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <!-- <el-input
            v-model="scope.row.date"
            size="small"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          /> -->
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基础工资" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.basic_wage"
            size="small"
            placeholder="请输入内容"
            @change="handleEdit(row.name,'basic_wage',row.basic_wage)"
          />
          <span class="span">{{ row.basic_wage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="罚款" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.forfeit"
            size="small"
            placeholder="请输入内容"
            @change="handleEdit(row.name,'forfeit',row.forfeit)"
          />
          <span class="span">{{ row.forfeit }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提成" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.commission"
            size="small"
            placeholder="请输入内容"
            @change="handleEdit(row.name,'commission',row.commission)"
          />
          <span class="span">{{ row.commission }}</span>
        </template>
      </el-table-column>
      <el-table-column label="补贴" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <el-input
            v-model="row.subsidy"
            size="small"
            placeholder="请输入内容"
            @change="handleEdit(row.name,'subsidy',row.subsidy)"
          />
          <span class="span">{{ row.subsidy }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实发工资" min-width="90px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.total_wages }}</span>
        </template>
      </el-table-column>
    </el-table>
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
        <el-form-item label="权限">
          <el-rate
            v-model="temp.roles"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:8px;"
          />
        </el-form-item>
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
  </div>
</template>

<script>
import { wagesList, updateRoles, updateWages } from '@/api/wages'
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: '经理', display_name: '经理层' },
  { key: '计算机部', display_name: '计算机部' }
]
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
    handleEdit(name, keyname, wages) {
      console.log(name, keyname, wages)
      updateWages({ name, keyname, wages }).then(() => {
        // console.log('sldfk')
        this.getList()
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: '操作成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    getList() {
      this.listLoading = true

      wagesList(this.listQuery).then(res => {
        console.log(res.data.data)

        res.data.data.forEach(function(e) {
          // console.log(e.total_wages)
          // console.log(e.basic_wage)
          // console.log(e.commission)
          // console.log(e.total_wages)
          e.total_wages = e.basic_wage + e.commission + e.subsidy - e.forfeit
        })
        this.list = res.data.data
        this.total = res.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 0.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    // handleModifyStatus(row, status) {
    //   row.status = status
    //   console.log(row.status)
    //   updateStatus(row).then(() => {
    //     console.log('sldfk')
    //     this.getList()
    //     const index = this.list.findIndex(v => v.id === this.temp.id)
    //     this.list.splice(index, 1, this.temp)
    //     this.dialogFormVisible = false
    //     this.$notify({
    //       title: 'Success',
    //       message: '操作成功',
    //       type: 'success',
    //       duration: 2000
    //     })
    //   })
    // },
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

<style lang="scss" scoped>

.span {
    display: none
}

</style>
