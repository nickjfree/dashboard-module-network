<template>
  <detail
    :on-manager="onManager"
    :data="data"
    resource="eips"
    statusModule="eip"
    :base-info="baseInfo"
    :extra-info="extraInfo" />
</template>

<script>
import { getAssociateNameTableColumn } from '../utils/columns'
import { getBrandTableColumn } from '@/utils/common/tableColumn'
import { sizestr } from '@/utils/utils'
import WindowsMixin from '@/mixins/windows'

export default {
  name: 'EipDetail',
  mixins: [WindowsMixin],
  props: {
    onManager: {
      type: Function,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      baseInfo: [
        getBrandTableColumn(),
        getAssociateNameTableColumn(this),
        {
          field: 'ip_addr',
          title: this.$t('network.text_213'),
        },
        {
          field: 'bandwidth',
          title: this.$t('network.text_195'),
          formatter: ({ cellValue }) => {
            return sizestr(cellValue, 'M', 1024)
          },
        },
        {
          field: 'charge_type',
          title: this.$t('network.text_192'),
          formatter: ({ cellValue }) => {
            const type = {
              traffic: this.$t('network.text_193'),
              bandwidth: this.$t('network.text_194'),
            }
            return type[cellValue]
          },
        },
      ],
      extraInfo: [],
    }
  },
}
</script>
