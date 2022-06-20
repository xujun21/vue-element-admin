<template>
  <record-detail :is-edit="false" />
</template>

<script>
import RecordDetail from '../components/RecordDetail'

export default {
  name: 'NewRecord',
  components: { RecordDetail }
}
</script>

