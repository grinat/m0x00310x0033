<template>
  <div class="m-tags-filter">
    <m-tags-filter-items
      :items="tree.children"
      @change="onChange"
      :value="value"
    ></m-tags-filter-items>
  </div>
</template>

<script>
  import MTagsFilterItems from "./tags-filter-items"

  class MapValue {
    childs = []
    parents = []
  }

  export default {
    name: "m-tags-filter",
    components: {MTagsFilterItems},
    props: {
      value: Array,
      tree: Object
    },
    methods: {
      onChange ({nodes, checked}) {
        let resultModel = this.value.slice()
        nodes.forEach(node => {
          if (checked) {
            // check node and all parents
            resultModel.push(node.id, ...this.idChildsParentsIndex[node.id].parents)
          } else {
            // uncheck node and all childs
            const targetIds = [node.id, ...this.idChildsParentsIndex[node.id].childs]
            resultModel = resultModel.filter(id => targetIds.indexOf(id) === -1)
          }
        })
        this.$emit('input', [...new Set(resultModel)])
      }
    },
    computed: {
      idChildsParentsIndex () {
        const index = {}
        const stack = [...this.tree.children]
        while (stack.length) {
          const node = stack.pop()
          if(!index[node.id]) index[node.id] = new MapValue()

          if (node.children.length) {
            node.children.forEach(child => {
              index[node.id].childs.push(child.id)
              stack.push(child)
            })
          }
        }

        // collect all parents and childs
        for (let id in index) {
          index[id].childs.forEach(v => {
            if (!index[v]) index[v] = new MapValue()

            index[v].parents.push(+id, ...index[id].parents)
            index[id].childs.push(...index[v].childs)
          })
        }

        return index
      }
    }
  }
</script>
