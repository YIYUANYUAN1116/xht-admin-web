import { onMounted } from 'vue';
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- v-model 即为选中的值 -->
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c1Id"
          @change="handler"
        >
          <!-- label:即为展示数据 value:即为select下拉菜单收集的数据 -->
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c2Id"
          @change="handler1"
        >
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
//引入分类相关的仓库
import useCategoryStore from "@/store/modules/category";

let categoryStore = useCategoryStore();

const getC1 = () => {
  //通知分类仓库发请求获取一级分类的数据
  categoryStore.getC1();
};

onMounted(() => {
  getC1();
});

//一级菜单选中回调
const handler = () => {
  //需要将二级、三级分类的数据清空
  categoryStore.c2Id = "";
  categoryStore.c3Arr = [];
  categoryStore.c3Id = "";
  //通知仓库获取二级分类的数据
  categoryStore.getC2();
};

const handler1 = () => {
  //清理三级分类的数据
  categoryStore.c3Id = "";
  categoryStore.getC3();
};

//接受父组件传递过来scene
defineProps(["scene"]);
</script>

<style scoped></style>
