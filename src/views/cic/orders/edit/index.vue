<template>
  <order-detail :is-edit="true" />
</template>

<script>
import OrderDetail from '../components/OrderDetail.vue'

export default {
  name: 'EditForm',
  components: { OrderDetail }
}
</script>
