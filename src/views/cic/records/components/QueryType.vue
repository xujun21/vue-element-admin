<template>
  <el-row>
    <el-select v-model="type" filterable allow-create placeholder="咨询问题类型" @on-create="handleCreate">
      <el-option v-for="item in typeList" :key="item.value" :value="item.value">{{ item.label }}</el-option>
    </el-select>
  </el-row>
</template>
<script>
export default {
  name: 'QueryType',
  data() {
    return {
      typeList: [
        {
          value: '咨询',
          label: '咨询'
        },
        {
          value: '投诉',
          label: '投诉'
        },
        {
          value: '建议',
          label: '建议'
        }
      ],
      type: ''
    }
  },
  methods: {
    handleCreate(val) {
      this.typeList.push({
        value: val,
        label: val
      })
    }
  }
}
</script>
