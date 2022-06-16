<template>
  <member-detail :is-edit="true" />
</template>

<script>
import MemberDetail from './components/MemberDetail'

export default {
  name: 'EditForm',
  components: { MemberDetail }
}
</script>

