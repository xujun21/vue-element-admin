<template>
  <record-detail :is-edit="true" />
</template>

<script>
import RecordDetail from '../components/RecordDetail'

export default {
  name: 'EditForm',
  components: { RecordDetail }
}
</script>

