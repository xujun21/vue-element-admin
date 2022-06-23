<template>
  <el-row>
    <el-cascader
      v-model="value"
      :options="options"
      :props="{ expandTrigger: 'hover' }"
      placeholder="咨询问题类型"
      @change="handelChange"
    />
  </el-row>
</template>
<script>
export default {
  name: 'QueryType',
  data() {
    return {
      value: [],
      options: [
        {
          value: '1',
          label: '活动',
          children: [
            {
              value: '1.1',
              label: '节日大促活动'
            },
            {
              value: '1.2',
              label: '活动中奖'
            },
            {
              value: '1.3',
              label: '其他'
            }
          ]
        },
        {
          value: '2',
          label: '表扬',
          children: [
            {
              value: '2.1',
              label: '门店服务态度'
            },
            {
              value: '2.2',
              label: '对门店人员表扬'
            },
            {
              value: '2.3',
              label: '对客服表扬'
            },
            {
              value: '2.4',
              label: '其他'
            }
          ]
        },
        {
          value: '3',
          label: '优选',
          children: [
            {
              value: '3.1',
              label: '订单情况'
            },
            {
              value: '3.2',
              label: '其他'
            }
          ]
        },
        {
          value: '4',
          label: '引流',
          children: [
            {
              value: '4.1',
              label: '售前'
            },
            {
              value: '4.2',
              label: '售后'
            },
            {
              value: '4.3',
              label: '会员'
            },
            {
              value: '4.4',
              label: '验光'
            },
            {
              value: '4.5',
              label: '商品'
            },
            {
              value: '4.6',
              label: '其他'
            }
          ]
        },
        {
          value: '5',
          label: '疑似做账问题',
          children: [
            {
              value: '5.1',
              label: '订单金额与支付金额不一致'
            },
            {
              value: '5.2',
              label: 'M类开单异常'
            },
            {
              value: '5.3',
              label: '验光费开单异常'
            }
          ]
        },
        {
          value: '6',
          label: '电商平台',
          children: [
            {
              value: '6.1',
              label: '订单情况'
            },
            {
              value: '6.2',
              label: '售前、活动'
            },
            {
              value: '6.3',
              label: '售后'
            }
          ]
        },
        {
          value: '7',
          label: '其他',
          children: [
            {
              value: '7.1',
              label: '非宝岛咨询'
            },
            {
              value: '7.2',
              label: '加盟'
            },
            {
              value: '7.3',
              label: '其他部门'
            },
            {
              value: '7.4',
              label: '广告'
            },
            {
              value: '7.5',
              label: '无咨询/已回复/未回复'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handelChange(value) {
      console.log(value)
    }
  }
}
</script>

<!--
<div class="block">
  <span class="demonstration">默认 click 触发子菜单</span>
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange"></el-cascader>
</div>
<div class="block">
  <span class="demonstration">hover 触发子菜单</span>
  <el-cascader
    v-model="value"
    :options="options"
    :props="{ expandTrigger: 'hover' }"
    @change="handleChange"></el-cascader>
</div> -->
