<template>
  <div class="user-container">
    <div class="top-query">
      <el-card>
        <el-form ref="form" :model="userForm" :inline="true">
          <el-form-item prop="userId">
            <el-input
              v-model="userForm.userId"
              placeholder="请输入用户ID"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userName">
            <el-input
              v-model="userForm.userName"
              placeholder="请输入用户名称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="state">
            <el-select v-model="userForm.state" placeholder="请选择">
              <el-option label="所有" :value="0"></el-option>
              <el-option label="在职" :value="1"></el-option>
              <el-option label="离职" :value="2"></el-option>
              <el-option label="试用期" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryUserList">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="content-box">
      <el-card>
        <div class="operate-box">
          <el-button type="primary" @click="showDialog('add')">新增</el-button>
          <el-button type="danger" @click="bulkDeleteUsers">批量删除</el-button>
        </div>
        <div class="table-box">
          <el-table
            :data="list"
            style="width: 100%"
            border
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column
              v-for="item in userList"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
              :formatter="item.formatter"
            />
            <el-table-column label="操作" align="center">
              <template #default="{ row }">
                <el-button @click="showDialog('edit', row)">Edit</el-button>
                <el-button type="danger" @click="deletUser([row.userId])"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-box">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.pageNum"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>

    <!-- 新增用户 -->
    <el-dialog
      :title="(action === 'add' ? '新增' : '编辑') + '用户'"
      v-model="showModal"
    >
      <el-form
        ref="dialogForm"
        :model="addUserForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model="addUserForm.userName"
            :disabled="action == 'edit'"
            placeholder="请输入用户名称"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            v-model="addUserForm.userEmail"
            :disabled="action == 'edit'"
            placeholder="请输入用户邮箱"
          >
            <template #append>@imooc.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addUserForm.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="addUserForm.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="addUserForm.state">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="系统角色" prop="roleList">
          <el-select
            v-model="addUserForm.roleList"
            placeholder="请选择用户系统角色"
            multiple
            style="width: 100%"
          >
            <el-option
              v-for="role in roleList"
              :key="role._id"
              :label="role.roleName"
              :value="role._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="addUserForm.deptId"
            placeholder="请选择所属部门"
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width: 100%"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showModal = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, deletUsers, addOrEditUser } from '@/api/user/login'
import { getDeptList } from '@/api/department/index'
import { getAllRoles } from '@/api/role/index'
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted, reactive, ref, getCurrentInstance } from 'vue'
import { formatDate } from '@/utils/utils.js'
export default {
  name: 'user',
  setup() {
    // 获取 Composition API 上下文对象
    const { ctx } = getCurrentInstance()
    // 初始化用户表单对象
    const userForm = reactive({
      state: 0,
      userName: '',
      userId: ''
    })
    // 额外定义一个 pageForm 防止条件查询还没有点击 翻页的时候也带了条件查询参数
    let pageUserForm = ref({})
    const page = reactive({
      pageNum: 1,
      pageSize: 10,
      total: 0
    })

    // 表格表头信息
    const userList = reactive([
      {
        prop: 'userId',
        label: '用户ID'
      },
      {
        prop: 'userName',
        label: '用户名'
      },
      {
        prop: 'userEmail',
        label: '用户邮箱'
      },
      {
        prop: 'role',
        label: '用户角色',
        formatter(row, column, cellValue) {
          return {
            0: '管理员',
            1: '普通用户'
          }[cellValue]
        }
      },
      {
        prop: 'state',
        label: '用户状态',
        formatter(row, column, cellValue) {
          return {
            1: '在职',
            2: '离职',
            3: '试用期'
          }[cellValue]
        }
      },
      {
        prop: 'createTime',
        label: '注册时间',
        formatter(row, column, cellValue) {
          return formatDate(cellValue, 'yyyy-MM-DD hh:mm:ss')
        }
      },
      {
        prop: 'lastLoginTime',
        label: '最后登录时间',
        formatter(row, column, cellValue) {
          return formatDate(cellValue, 'yyyy-MM-DD hh:mm:ss')
        }
      }
    ])
    // 初始化用户列表数据
    const list = ref([])

    // 获取用户列表
    const fetchUserList = async (params) => {
      try {
        const res = await getUserList(params)
        list.value = res.list
        page.total = res.page.total
        // 查询成功后 将翻页的条件查询换成当前的条件
        pageUserForm.value = { ...userForm }
      } catch (err) {
        ElMessage({
          showClose: true,
          message: '获取用户列表数据失败',
          type: 'error'
        })
      }
    }
    // 条件查询表单数据
    const queryUserList = () => {
      // 每次条件查询之后 回到第一页
      page.pageNum = 1
      let params = { ...userForm, ...page }
      fetchUserList(params)
    }

    // 获取表单ref
    const form = ref(null)
    // 重置表单
    const resetForm = () => {
      form.value.resetFields()
    }
    // 分页时候的操作
    const handleCurrentChange = (pageNum) => {
      page.pageNum = pageNum
      let params = { ...pageUserForm.value, ...page }
      fetchUserList(params)
    }

    // 删除用户
    const deletUser = (userIds) => {
      ElMessageBox.confirm('确定删除选中用户吗？', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let params = {
            userIds
          }
          try {
            await deletUsers(params)
            fetchUserList()
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
          } catch (err) {
            ElMessage({
              type: 'error',
              message: '删除失败'
            })
          }
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    }

    // 记录被选中的用户
    const choosedArr = ref([])

    // 用户选择操作
    const handleSelectionChange = (val) => {
      choosedArr.value = val.map((item) => item.userId)
    }

    // 批量删除用户操作
    const bulkDeleteUsers = async () => {
      let params = [...choosedArr.value]
      if (!params.length > 0) {
        ElMessage({
          type: 'info',
          message: '请选择需要删除的用户'
        })
      } else {
        const res = await deletUser(params)
      }
    }

    // 新增用户操作
    const showModal = ref(false)
    const addUserForm = ref({
      state: 3
    })

    // 所有角色列表
    const roleList = ref([])
    // 所有部门列表
    const deptList = ref([])
    // 定义用户操作行为
    const action = ref('add')
    // 定义表单校验规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名称',
          trigger: 'blur'
        }
      ],
      userEmail: [
        { required: true, message: '请输入用户邮箱', trigger: 'blur' }
      ],
      mobile: [
        {
          pattern: /1[3-9]\d{9}/,
          message: '请输入正确的手机号格式',
          trigger: 'blur'
        }
      ],
      deptId: [
        {
          required: true,
          message: '请输入用户邮箱',
          trigger: 'blur'
        }
      ]
    })

    // 打开对话框
    const showDialog = (type, row) => {
      action.value = type
      showModal.value = true
      ctx.$nextTick(() => {
        ctx.$refs.dialogForm.resetFields()
        addUserForm.value = row ? { ...row } : { state: 3 }
      })
    }

    // 获取所有用户角色
    const fetchAllRoles = async () => {
      try {
        const { list } = await getAllRoles()
        roleList.value = list.map((item) => {
          return {
            _id: item._id,
            roleName: item.roleName
          }
        })
      } catch (err) {
        ElMessage({
          type: 'error',
          message: '角色列表获取失败！'
        })
      }
    }

    // 获取部门列表信息
    const fetchAllDeptList = async () => {
      try {
        const res = await getDeptList()
        deptList.value = res
      } catch (err) {
        ElMessage({
          type: 'error',
          message: '部门信息获取失败！'
        })
      }
    }

    // 表单提交
    const handleSubmit = () => {
      ctx.$refs.dialogForm.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm(
            `确定${action.value === 'add' ? '增加' : '编辑'}用户吗？`,
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(async () => {
              try {
                let params = { ...addUserForm.value }
                params.action = action.value
                const res = await addOrEditUser(params)

                queryUserList()
                showModal.value = false
                ElMessage({
                  type: 'success',
                  message: '操作成功'
                })
              } catch (err) {
                ElMessage({
                  type: 'error',
                  message: '操作失败'
                })
              }
            })
            .catch(() => {})
        }
      })
    }

    onMounted(async () => {
      fetchUserList()
      fetchAllRoles()
      fetchAllDeptList()
    })

    return {
      fetchAllDeptList,
      fetchAllRoles,
      userList,
      list,
      userForm,
      resetForm,
      queryUserList,
      handleCurrentChange,
      page,
      pageUserForm,
      form,
      deletUser,
      handleSelectionChange,
      choosedArr,
      bulkDeleteUsers,
      showModal,
      addUserForm,
      roleList,
      deptList,
      action,
      rules,
      handleSubmit,
      showDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.user-container {
  .content-box {
    margin-top: 15px;

    .table-box {
      margin-top: 15px;
    }
    .page-box {
      display: flex;
      justify-content: end;
      padding: 15px;
    }
  }
}
</style>
