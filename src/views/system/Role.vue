<template>
  <div class="role-container">
    <div class="top-query">
      <el-card>
        <el-form ref="queryFormRef" :model="queryForm" :inline="true">
          <el-form-item prop="roleName">
            <el-input
              v-model="queryForm.menuName"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchRoleList">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="content-box">
      <el-card>
        <div class="operate-box">
          <el-button type="primary" @click="addRole()">创建</el-button>
        </div>
        <div class="table-box">
          <el-table :data="list" style="width: 100%" border stripe>
            <el-table-column
              label-class-name="table-header-row"
              v-for="item in roleHeaderList"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              align="center"
              :formatter="item.formatter"
            />
            <el-table-column
              label="操作"
              align="center"
              label-class-name="table-header-row"
              width="250"
            >
              <template #default="{ row }">
                <el-button @click="editRole(row)">编辑</el-button>
                <el-button @click="setOrder(row)">设置权限</el-button>
                <el-button type="danger" @click="deleteRole(row)"
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

    <!-- 新增菜单 -->
    <!-- <el-dialog title="新增菜单" v-model="showModal">
      <el-form
        ref="addMenuFormRef"
        :model="addMenuForm"
        label-width="100px"
        :rules="addMenuFormRules"
        class="add-menu-form"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            v-model="addMenuForm.parentId"
            placeholder="请选择父级菜单"
            :options="parentIdList"
            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
            clearable
            style="width: 100%"
          ></el-cascader>
          <span>不选则直接创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="addMenuForm.menuType">
            <el-radio :label="1">按钮</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            v-model="addMenuForm.menuName"
            placeholder="请输入菜单名称"
          />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="addMenuForm.menuType == 1"
        >
          <el-input v-model="addMenuForm.icon" placeholder="请输入菜单图标" />
        </el-form-item>
        <el-form-item
          label="路由地址"
          prop="path"
          v-show="addMenuForm.menuType == 1"
        >
          <el-input v-model="addMenuForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item
          label="组件路由"
          prop="component"
          v-show="addMenuForm.menuType == 1"
        >
          <el-input
            v-model="addMenuForm.component"
            placeholder="请输入组件路由"
          />
        </el-form-item>
        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="addMenuForm.menuType == 2"
        >
          <el-input
            v-model="addMenuForm.menuCode"
            placeholder="请输入权限标识"
          />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-radio-group v-model="addMenuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showModal = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog> -->
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import { formatDate } from '../../utils/utils'
export default {
  name: 'Menu',
  data() {
    return {
      // 菜单条件搜索参数
      queryForm: {
        menuName: ''
      },
      // 菜单列表数据
      list: [],
      // 表格表头元数据
      roleHeaderList: [
        {
          prop: 'roleName',
          label: '角色名称'
        },
        {
          prop: 'beizhu',
          label: '备注'
        },
        {
          prop: 'roleList',
          label: '权限列表'
        },
        {
          prop: 'createTime',
          label: '创建时间',
          formatter(row, column, cellValue) {
            return formatDate(cellValue, 'yyyy-MM-DD hh:mm:ss')
          }
        }
      ],
      // 新增表单对话框控制
      showModal: false,

      // 增加还是编辑表单
      action: 'add',

      // 翻页相关数据
      page: {
        total: 0,
        pageNum: 0,
        pageSize: 10
      }
    }
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$ref.queryFormRef.resetFields()
    },

    // 创建角色
    addRole() {
      console.log('创建')
    },

    // 编辑角色
    editRole() {},
    // 设置权限
    setOrder() {
      console.log('设置权限')
    },
    // 删除角色
    deleteRole() {
      console.log('删除角色')
    },

    // 翻页时候的操作
    handleCurrentChange(pageNum) {
      console.log(pageNum)
    },

    // 新增表单
    // addMenu(type, row) {
    //   this.action = 'add'
    //   this.showModal = true
    //   // 初始化表单
    //   this.$nextTick(() => {
    //     this.$refs.addMenuFormRef.resetFields()
    //     this.addMenuForm = {
    //       menuType: 1,
    //       menuState: 1,
    //       parentId: [null]
    //     }
    //     if (type == 2) {
    //       this.addMenuForm.parentId = [...row.parentId, row._id].filter(
    //         (item) => item
    //       )
    //     }
    //   })
    // },

    // 编辑菜单
    // editMenu(row) {
    //   this.action = 'edit'
    //   this.showModal = true
    //   // 初始化表单
    //   this.$nextTick(() => {
    //     this.$refs.addMenuFormRef.resetFields()
    //     this.addMenuForm = { ...row }
    //   })
    // },

    // 删除菜单
    // deleteMenu(row) {
    //   ElMessageBox.confirm(`确定删除菜单吗？`, {
    //     confirmButtonText: '确认',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(async () => {
    //       this.action = 'delete'
    //       await operateMenu({ _id: row._id })
    //       this.fetchMenuList()
    //       try {
    //         ElMessage({
    //           type: 'success',
    //           message: '删除成功'
    //         })
    //       } catch (err) {
    //         ElMessage({
    //           type: 'error',
    //           message: '删除失败'
    //         })
    //       }
    //     })
    //     .catch(() => {})
    //   this.action = 'delete'
    // },

    // 提交表单
    // handleSubmit() {
    //   this.$refs.addMenuFormRef.validate((valid) => {
    //     if (valid) {
    //       ElMessageBox.confirm(
    //         `确定${this.action === 'add' ? '增加' : '编辑'}菜单吗？`,
    //         {
    //           confirmButtonText: '确认',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }
    //       )
    //         .then(async () => {
    //           let params = { ...this.addMenuForm }
    //           params.action = this.action
    //           try {
    //             await operateMenu(params)
    //             this.fetchMenuList()
    //             this.showModal = false
    //             ElMessage({
    //               type: 'success',
    //               message: '操作成功'
    //             })
    //           } catch (err) {
    //             ElMessage({
    //               type: 'error',
    //               message: '操作失败'
    //             })
    //           }
    //         })
    //         .catch(() => {})
    //     }
    //   })
    // },
    // 获取菜单列表
    async fetchRoleList() {
      try {
        let params = { ...this.queryForm }
        // const res = await getRoleList(params)
        // this.list = res
      } catch (e) {
        ElMessage({
          type: 'error',
          message: '菜单列表获取失败'
        })
      }
    }
  },
  mounted() {
    this.fetchRoleList()
  }
}
</script>

<style lang="scss" scoped>
.role-container {
  .add-menu-form {
    padding-right: 50px;
  }
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
<style>
.table-header-row {
  font-weight: 600;
}
</style>
