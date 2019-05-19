<template>
  <nav class="m-pagination pagination" role="navigation" aria-label="pagination">
    <input
      v-if="pages.length > 0"
      class="input"
      :value="meta.perPage"
      @keyup.enter.stop.prevent="pageCountChange"
      @blur="pageCountChange"
    />
    <ul class="pagination-list">
      <li
        v-for="page in pages"
        :key="page"
      >
        <a
          class="pagination-link"
          :class="{'is-current': meta.currentPage === page}"
          @click.stop.prevent="$emit('pageChange', page)"
        >{{page}}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: "m-pagination",
    props: {
      meta: {
        type: Object
      }
    },
    computed: {
      pages () {
        return Array.from({length: this.meta.pages}, (_, i) => 1 + i)
      }
    },
    methods: {
      pageCountChange ({target: {value}}) {
        if (value > 0) {
          this.$emit('pageCountChange', value)
        }
      }
    }
  }
</script>

<style lang="scss">
  .m-pagination {

    .input {
      width: 50px;
    }
  }
</style>
