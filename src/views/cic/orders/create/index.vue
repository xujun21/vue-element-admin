<template>
  <order-detail :is-edit="false" />
</template>

<script>
import OrderDetail from '../components/OrderDetail.vue'

export default {
  name: 'CreateOrder',
  components: { OrderDetail }
}
</script>
