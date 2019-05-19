<template>
  <div class="m-select select">
    <select
      @change="({target}) => $emit('input', target.options[target.selectedIndex].value)"
    >
      <option value="">All</option>
      <optgroup
        v-for="(group, groupKey) in items"
        :key="groupKey"
        :label="groupKey"
      >
        <option
          v-for="itemKey in group"
          :key="itemKey"
          :value="itemKey"
          :selected="value === itemKey"
        >{{itemKey}}</option>
      </optgroup>
    </select>
  </div>
</template>

<script>
  export default {
    name: "m-select-with-groups",
    props: {
      items: Object,
      value: [String]
    }
  }
</script>
