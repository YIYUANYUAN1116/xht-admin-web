<template>
  <div class="custom-tree-container">
    <el-tree
      ref="tree"
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span class="edit">
            <a v-if="node.level <= 2" @click="append(node, data)"> 添加 </a>
            <a style="margin: 8px" @click="edit(node, data)"> 编辑 </a>
            <a @click="remove(node, data)"> 删除 </a>
          </span>
        </span>
      </template>
    </el-tree>

    <el-dialog v-model="dialogFormVisible">
      <el-form :label-position="top" style="max-width: 460px">
        <el-form-item label="分类名称">
          <el-input v-model="categoryObjParams.name" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
//引入组合式API函数ref
import type {
  CategoryObj,
  CategoryResponseData,
} from "@/api/product/category/type";
import {
  getCategory,
  reqAddOrUpdateCategory,
  reqRemoveCategory,
} from "@/api/product/category/index";
import { ref, reactive } from "vue";

const props = {
  label: "name",
  children: "zones",
  isLeaf: "isLeaf",
};

let tree = ref();

//控制编辑框
let dialogFormVisible = ref<boolean>(false);

//定义收集新增分类
let categoryObjParams = reactive<CategoryObj>({
  id: "",
  name: "",
  parentId: -1,
  imageUrl: "",
  state: 0,
  orderNum: 0,
});

let curNode: Node = null;

const loadNode = (node: any, resolve: (data: CategoryObj[]) => void) => {
  if (node.level === 0) {
    getCategorybyParentId(0, resolve);
  }
  if (node.level >= 1) {
    getCategorybyParentId(node.data.id, resolve);
  }
};

const getCategorybyParentId = async (
  pId = 0,
  resolve: (data: CategoryObj[]) => void,
) => {
  const result: CategoryResponseData = await getCategory(pId);
  return resolve(result.data);
};

const append = (node: Node, data: CategoryObj) => {
  dialogFormVisible.value = true;
  categoryObjParams.name = "";
  categoryObjParams.parentId = data.id;
  curNode = node;
  console.log(curNode);
};

const edit = (node: Node, data: CategoryObj) => {
  dialogFormVisible.value = true;
  Object.assign(categoryObjParams, data);
  curNode = node;
};

const remove = async (node: any, data: CategoryObj) => {
  let result = await reqRemoveCategory(data.id);
  if (result.code === 200) {
    //刷新node
    const parent = node.parent;
    const children: any = parent.childNodes;
    const index = children.findIndex((d) => d.id === node.id);
    children.splice(index, 1);
    //弹出提示信息
    ElMessage({
      type: "success",
      message: "操作成功",
    });
  } else {
    //弹出提示信息
    ElMessage({
      type: "error",
      message: "操作失败",
    });
  }
};

const onSubmit = async () => {
  // const isUpdate = categoryObjParams.id?true:false;
  // console.log(isUpdate);
  // this.$refs.tree.setCurrentKey(null);
  // if(isUpdate){

  // }else{

  // }

  let result = await reqAddOrUpdateCategory(categoryObjParams);

  if (result.code === 200) {
    //关闭对话框
    dialogFormVisible.value = false;

    //弹出提示信息
    ElMessage({
      type: "success",
      message: categoryObjParams.id ? "修改成功" : "添加成功",
    });
  } else {
    //弹出提示信息
    ElMessage({
      type: "error",
      message: categoryObjParams.id ? "修改失败" : "添加失败",
    });
  }
};

//对话框底部取消按钮
const cancel = () => {
  //对话框隐藏
  dialogFormVisible.value = false;
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.edit {
  color: #409eff;
}
</style>
