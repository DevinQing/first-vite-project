<template>
  <div class="user-container">
    <div class="top-query">
      <el-card>
        <el-form ref="queryFormRef" :model="queryForm" :inline="true">
          <el-form-item prop="menuName">
            <el-input
              v-model="queryForm.menuName"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item prop="menuState">
            <el-select v-model="queryForm.menuState" placeholder="请选择">
              <el-option label="正常" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="fetchMenuList">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <div class="content-box">
      <el-card>
        <div class="operate-box">
          <el-button type="primary" @click="addMenu(1)">新增</el-button>
        </div>
        <div class="table-box">
          <el-table
            :data="list"
            style="width: 100%"
            border
            stripe
            :tree-props="{ children: 'children' }"
            row-key="_id"
          >
            <el-table-column
              label-class-name="table-header-row"
              v-for="item in menuHeaderList"
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
              width="210"
            >
              <template #default="{ row }">
                <el-button @click="addMenu(2, row)">新增</el-button>
                <el-button @click="editMenu(row)">编辑</el-button>
                <el-button type="danger" @click="deleteMenu(row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>

    <!-- 新增菜单 -->
    <el-dialog title="新增菜单" v-model="showModal">
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
    </el-dialog>
  </div>
</template>

<script>
import { ElMessageBox, ElMessage } from 'element-plus'
import { operateMenu, getMenuList } from '@/api/menu/index'
import { formatDate } from '../../utils/utils'
export default {
  name: 'Menu',
  data() {
    return {
      // 菜单条件搜索参数
      queryForm: {
        menuName: '',
        menuState: 1
      },
      // 菜单列表数据
      list: [],
      // 表格表头元数据
      menuHeaderList: [
        {
          prop: 'menuName',
          label: '菜单名称'
        },
        {
          prop: 'icon',
          label: '图标'
        },
        {
          prop: 'menuType',
          label: '菜单类型',
          formatter(cell, col, value) {
            return {
              1: '按钮',
              2: '菜单'
            }[value]
          }
        },
        {
          prop: 'menuCode',
          label: '权限标识'
        },
        {
          prop: 'path',
          label: '路由地址'
        },
        {
          prop: 'component',
          label: '组件路径'
        },
        {
          prop: 'menuState',
          label: '菜单状态',
          formatter(cell, col, value) {
            return {
              1: '正常',
              2: '停用'
            }[value]
          }
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
      // 新增表单数据
      addMenuForm: {
        menuType: 1,
        menuState: 1,
        parentId: [null]
      },
      // 新增表单规则
      addMenuFormRules: {
        menuName: [
          {
            required: true,
            message: '菜单名称不能为空',
            trigger: 'blur'
          }
        ]
      },
      // 父级菜单列表数据
      parentIdList: [],
      // 增加还是编辑表单
      action: 'add'
    }
  },
  methods: {
    // 条件查询菜单列表
    queryMenuList() {
      console.log('查询')
    },
    // 重置表单
    resetForm() {
      console.log('重制')
    },

    // 新增表单
    addMenu(type, row) {
      this.action = 'add'
      this.showModal = true
      // 初始化表单
      this.$nextTick(() => {
        this.$refs.addMenuFormRef.resetFields()
        this.addMenuForm = {
          menuType: 1,
          menuState: 1,
          parentId: [null]
        }
        if (type == 2) {
          this.addMenuForm.parentId = [...row.parentId, row._id].filter(
            (item) => item
          )
        }
      })
    },

    // 编辑菜单
    editMenu(row) {
      this.action = 'edit'
      this.showModal = true
      // 初始化表单
      this.$nextTick(() => {
        this.$refs.addMenuFormRef.resetFields()
        this.addMenuForm = { ...row }
      })
    },

    // 删除菜单
    deleteMenu(row) {
      ElMessageBox.confirm(`确定删除菜单吗？`, {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.action = 'delete'
          await operateMenu({ _id: row._id })
          this.fetchMenuList()
          try {
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
        .catch(() => {})
      this.action = 'delete'
    },

    // 提交表单
    handleSubmit() {
      this.$refs.addMenuFormRef.validate((valid) => {
        if (valid) {
          ElMessageBox.confirm(
            `确定${this.action === 'add' ? '增加' : '编辑'}菜单吗？`,
            {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(async () => {
              let params = { ...this.addMenuForm }
              params.action = this.action
              try {
                await operateMenu(params)
                this.fetchMenuList()
                this.showModal = false
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
    },
    // 获取菜单列表
    async fetchMenuList() {
      try {
        let params = { ...this.queryForm }
        const res = await getMenuList(params)
        this.list = res
        this.parentIdList = res
      } catch (e) {
        ElMessage({
          type: 'error',
          message: '菜单列表获取失败'
        })
      }
    }
  },
  mounted() {
    this.fetchMenuList()
  }
}
</script>

<style lang="scss" scoped>
.user-container {
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
