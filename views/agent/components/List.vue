<template>
  <page-list
    show-tag-columns
    show-tag-filter
    :list="list"
    :columns="columns"
    :single-actions="singleActions"
    :group-actions="groupActions"
    :export-data-options="exportDataOptions" />
</template>

<script>
import * as R from 'ramda'
import { mapGetters } from 'vuex'
import ColumnsMixin from '../mixins/columns'
import SingleActionsMixin from '../mixins/singleActions'
import ListMixin from '@/mixins/list'
import WindowsMixin from '@/mixins/windows'

export default {
  name: 'AgentList',
  mixins: [WindowsMixin, ListMixin, ColumnsMixin, SingleActionsMixin],
  props: {
    id: String,
    getParams: {
      type: [Function, Object],
    },
  },
  data () {
    const filterOptions = {
      name: {
        label: this.$t('network.text_21'),
        filter: true,
        formatter: val => {
          return `name.contains(${val})`
        },
      },
      cluster: {
        label: this.$t('network.text_19'),
        dropdown: true,
        distinctField: {
          type: 'extra_field',
          key: 'cluster',
        },
      },
      region: {
        label: this.$t('dashboard.text_101'),
      },
      zone: {
        label: this.$t('compute.text_270'),
      },
    }
    const { path } = this.$route
    if (path.includes('/cluster')) {
      delete filterOptions.cluster
    }
    return {
      list: this.$list.createList(this, {
        id: this.id,
        resource: 'loadbalanceragents',
        getParams: this.getParam,
        filterOptions,
      }),
      exportDataOptions: {
        items: [
          { label: 'ID', key: 'id' },
          { label: this.$t('network.text_21'), key: 'name' },
          { label: this.$t('network.text_19'), key: 'cluster' },
          { label: this.$t('network.text_22'), key: 'ha_state' },
          { label: 'IP', key: 'ip' },
          { label: this.$t('network.text_23'), key: 'hb_last_seen' },
          { label: this.$t('network.text_24'), key: 'zone' },
          { label: this.$t('network.text_25'), key: 'version' },
        ],
      },
      groupActions: [
        {
          label: this.$t('network.text_26'),
          permission: 'lb_loadbalancers_create',
          action: () => {
            this.$router.push({
              name: 'AgentForm',
            })
          },
          meta: () => {
            return {
              buttonType: 'primary',
            }
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['isAdminMode']),
  },
  created () {
    this.initSidePageTab('agent-detail')
    this.list.fetchData()
  },
  methods: {
    getParam () {
      const ret = {
        ...(R.is(Function, this.getParams) ? this.getParams() : this.getParams),
      }
      return ret
    },
    handleOpenSidepage (row) {
      console.log(this.$store)
      this.sidePageTriggerHandle(this, 'AgentSidePage', {
        id: row.id,
        resource: 'loadbalanceragents',
        getParams: this.getParam,
      }, {
        list: this.list,
      })
    },
  },
}
</script>
