<template>

    <!--搜索栏-->
    <el-card style="height: 80px">
        <el-form :inline="true" class="form">
         <el-form-item label="查询日期">
            <el-input v-model="searchDate" placeholder="输入查询日期"></el-input>
         </el-form-item>

         <el-form-item label="">
            <el-button
          type="primary"
          size="default"
          :disabled="searchDate ? false : true"
          @click="search"
          >搜索</el-button
        >
        <el-button type="primary" size="default" @click="reset">重置</el-button>
         </el-form-item>
       </el-form>
    </el-card>

    <!--日志显示区域-->
    <el-card style="margin: 10px 0px" class="box-card">
        <el-table :data="logData" height="fit-content" width="100%" class="box-tabel">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="title" label="请求名称" />
            <el-table-column prop="operUrl" label="请求路径" />
            <el-table-column prop="operIp" label="请求ip" />
            <el-table-column prop="operName" label="操作人" />
            <el-table-column label="状态">
              <template #default="scope">
                <span>{{ scope.row.status==0?'成功':'失败' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="日期" width="200"/>
        </el-table>
    </el-card>

    <el-pagination
    :pager-count="9"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import {Records} from "@/api/log/type"
import {listLogs} from "@/api/log/index"

const searchDate = ref();
let logData = ref<Records>([]);
//当前页码
let pageNo = ref<number>(1);
//每一页展示多少条数据
let limit = ref<number>(10);
//存储已有品牌数据总数
let total = ref<number>(0);

const getLogList = async (pager = 1) =>{
    pageNo.value = pager
    const result = await listLogs(pageNo.value,limit.value);
    if (result.code == 200) {
    //存储已有品牌总个数
    total.value = result.data.total;
    logData.value = result.data.records;
    console.log(logData.value)
  }
}

const handleSizeChange =async () => {
  
}

const handleCurrentChange =async () => {
  
}

onMounted(()=>{
  getLogList();
})


const search = () =>{
    console.log("search")
}

const reset = () =>{
    console.log("reset")
}

</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card{
  height: fit-content;
}

.box-tabel{
  height:50vh;
}

</style>