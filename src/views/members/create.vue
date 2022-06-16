<template>
  <member-detail :is-edit="false" />
</template>

<script>
import MemberDetail from './components/MemberDetail'

export default {
  name: 'NewMember',
  components: { MemberDetail }
}
</script>

