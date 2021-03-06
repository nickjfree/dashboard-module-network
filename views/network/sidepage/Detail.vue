<template>
  <detail
    :on-manager="onManager"
    :data="data"
    :base-info="baseInfo"
    :extra-info="extraInfo"
    resource="networks"
    status-module="network" />
</template>

<script>
import {
  getBrandTableColumn,
  getCopyWithContentTableColumn,
  getPublicScopeTableColumn,
  getTagTableColumn,
} from '@/utils/common/tableColumn'
import WindowsMixin from '@/mixins/windows'

export default {
  name: 'NetworkDetail',
  mixins: [WindowsMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
    onManager: {
      type: Function,
      required: true,
    },
    columns: Array,
  },
  data () {
    return {
      baseInfo: [
        getPublicScopeTableColumn({ vm: this, resource: 'networks' }),
        getTagTableColumn({ onManager: this.onManager, needExt: true, resource: 'network', columns: () => this.columns }),
        getBrandTableColumn(),
        {
          field: 'guest_ip_start',
          title: this.$t('network.text_653'),
          formatter: ({ cellValue, row }) => {
            return `${cellValue}-${row.guest_ip_end}`
          },
        },
        {
          field: 'guest_ip_mask',
          title: this.$t('network.text_609'),
        },
        {
          field: 'guest_gateway',
          title: this.$t('network.text_654'),
        },
        {
          field: 'ports',
          title: this.$t('network.text_622'),
          slots: {
            default: ({ row }) => {
              return [
                <div>
                  总量{row.ports}，已用{row.ports_used <= 0 ? 0 : <a onClick={ () => this.$emit('tab-change', 'i-p-list') }>{row.ports_used}</a> }（含预留IP {row.reserve_vnics}）
                </div>,
              ]
            },
          },
        },
        {
          field: 'schedtags',
          title: this.$t('network.text_630'),
          formatter: ({ cellValue, row }) => {
            if (row.schedtags && row.schedtags.length > 0) {
              const schedtags = row.schedtags.map(v => v.name)
              return schedtags.join('，')
            }
            return '-'
          },
        },
      ],
      extraInfo: [
        {
          title: this.$t('network.text_308'),
          items: [
            getCopyWithContentTableColumn({
              field: 'vpc',
              title: 'VPC',
              hideField: true,
              slotCallback: row => {
                if (!row.vpc) return '-'
                return [
                  <side-page-trigger permission='vpcs_get' name='VpcSidePage' id={row.vpc_id} vm={this}>{ row.vpc }</side-page-trigger>,
                ]
              },
            }),
            {
              field: 'guest_dns',
              title: this.$t('network.text_585'),
            },
            {
              field: 'guest_domain',
              title: this.$t('network.text_586'),
              formatter: ({ cellValue }) => {
                return cellValue || '-'
              },
            },
            {
              field: 'wire',
              title: this.$t('network.text_571'),
              slots: {
                default: ({ row }) => {
                  return [
                    <side-page-trigger permission='wires_get' name='WireSidePage' id={row.wire_id} vm={this}>{ row.wire }</side-page-trigger>,
                  ]
                },
              },
            },
            {
              field: 'server_type',
              title: this.$t('network.text_655'),
              formatter: ({ cellValue }) => {
                if (cellValue === 'baremetal') {
                  return this.$t('network.text_598')
                }
                if (cellValue === 'container') {
                  return this.$t('network.text_599')
                }
                if (cellValue === 'guest') {
                  return this.$t('network.text_226')
                }
                return this.$t('network.text_507')
              },
            },
            {
              field: 'vlan_id',
              title: 'VLAN ID',
              formatter: ({ cellValue }) => {
                return cellValue || '-'
              },
            },
          ],
        },
      ],
    }
  },
}
</script>
