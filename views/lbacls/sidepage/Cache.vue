<template>
  <page-list
    :list="list"
    :columns="columns" />
</template>

<script>
import * as R from 'ramda'
import {
  getCopyWithContentTableColumn,
  getTimeTableColumn,
  getProjectTableColumn,
  getBrandTableColumn,
  getRegionTableColumn,
  getAccountTableColumn,
} from '@/utils/common/tableColumn'
import WindowsMixin from '@/mixins/windows'

export default {
  name: 'LbaclCacheList',
  mixins: [WindowsMixin],
  props: {
    id: String,
    getParams: {
      type: [Function, Object],
    },
    cloudEnv: String,
  },
  data () {
    return {
      list: this.$list.createList(this, {
        resource: 'cachedloadbalanceracls',
        getParams: this.getParam,
        filterOptions: {
          name: {
            label: this.$t('network.text_291'),
            filter: true,
            formatter: val => {
              return `name.contains(${val})`
            },
          },
        },
      }),
      columns: [
        getCopyWithContentTableColumn(),
        getTimeTableColumn(),
        {
          field: 'updated_at',
          title: this.$t('network.text_314'),
          width: 150,
          formatter: ({ cellValue }) => {
            return this.$moment(cellValue).format()
          },
        },
        getProjectTableColumn(),
        getBrandTableColumn(),
        getRegionTableColumn(),
        getAccountTableColumn(),
      ],
    }
  },
  created () {
    this.list.fetchData()
  },
  methods: {
    getParam () {
      const ret = {
        ...(R.is(Function, this.getParams) ? this.getParams() : this.getParams),
      }
      return ret
    },
  },
}
</script>
