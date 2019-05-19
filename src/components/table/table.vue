<template>
  <div class="m-table">
    <table v-if="items.length > 0" class=" table is-striped">
      <thead>
      <tr>
        <th v-for="(_, columnName) in items[0]" :key="`head_${columnName}`">{{columnName}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in items" :key="row.id">
        <td v-for="(column, columnName) in row" :key="`${row.id}_${columnName}`">{{column}}</td>
      </tr>
      </tbody>
    </table>
    <div v-else>
      No items found
    </div>
  </div>
</template>

<script>
  export default {
    name: "m-table",
    props: {
      items: {
        type: Array,
        default: () => ([])
      }
    }
  }
</script>

<style lang="scss">
  .m-table{
    overflow: auto;

    .table{
      width: 100%;
    }
  }
</style>
