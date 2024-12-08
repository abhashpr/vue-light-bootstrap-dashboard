<template>
  <table class="table" style="margin: -10px 0 0 16px">
    <thead>
      <slot name="columns">
        <tr style="background-color: #f7f7f8;">
          <th v-for="column in columns" 
              :key="column"
              style="color: #000"
              >{{column}}</th>
          <th v-if="tableControls">Controls</th>
        </tr>
      </slot>
    </thead>
    <tbody>
    <tr v-for="(item, index) in data" :key="index">
      <slot :row="item">
        <td v-for="column in columns" 
            :key="column" v-if="hasValue(item, column)"
            :style="'color:' + (column == highlight ? '#2ebf41' : 'black') + '; font-weight: ' + (column == highlight ? '700' : '100')">{{itemValue(item, column)}}
        </td>
        <td v-if="tableControls">
          <i class="fa fa-edit"></i>&nbsp;&nbsp;
          <i class="fa fa-times"></i>&nbsp;&nbsp;
          <i class="fa fa-history"></i>
        </td>
      </slot>
    </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    name: 'l-table',
    props: {
      columns: Array,
      data: Array,
      highlight: String,
      tableControls: Boolean
    },
    methods: {
      hasValue (item, column) {
        return item[column.toLowerCase()] !== 'undefined'
      },
      itemValue (item, column) {
        return item[column.toLowerCase()]
      }
    }
  }
</script>
<style>
</style>
