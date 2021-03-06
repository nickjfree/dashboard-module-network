import LbListCell from '@Network/views/lb/components/LbListCell'
import { LB_SCHEDULER_MAP } from '@Network/constants/lb'
import {
  getNameDescriptionTableColumn,
  getStatusTableColumn,
  getProjectTableColumn,
} from '@/utils/common/tableColumn'
import i18n from '@/locales'

export default {
  components: {
    LbListCell,
  },
  created () {
    this.columns = [
      getNameDescriptionTableColumn({
        onManager: this.onManager,
        hideField: true,
        steadyStatus: this.steadyStatus,
        title: i18n.t('network.text_21'),
        slotCallback: row => {
          return (
            <side-page-trigger onTrigger={ () => this.handleOpenSidepage(row) }>{ row.name }</side-page-trigger>
          )
        },
      }),
      getStatusTableColumn({ statusModule: 'lb' }),
      {
        field: 'listener_type&listener_port',
        title: i18n.t('network.text_472'),
        minWidth: 150,
        formatter: ({ row }) => `${row.listener_type}:${row.listener_port}`,
      },
      {
        field: 'scheduler',
        title: i18n.t('network.text_423'),
        minWidth: 100,
        formatter: ({ row }) => {
          if (!row.scheduler || row.redirect === 'raw') return '-'
          const scheduler = LB_SCHEDULER_MAP[row.scheduler]
          return scheduler ? scheduler.text : row.scheduler
        },
      },
      {
        field: 'backend_group',
        title: i18n.t('network.text_139'),
        minWidth: 200,
        formatter: ({ row }) => {
          if (!row.backend_group || row.redirect === 'raw') return '-'
          return row.backend_group
        },
      },
      getStatusTableColumn({
        minWidth: 100,
        statusModule: 'lbHealth',
        field: 'health_check',
        title: i18n.t('network.text_469'),
        slotCallback: (row) => {
          return row.redirect === 'raw' ? '-' : null
        },
      }),
      getStatusTableColumn({ minWidth: 100, statusModule: 'lbAcl', field: 'acl_status', title: i18n.t('network.text_142') }),
      getStatusTableColumn({ minWidth: 100, statusModule: 'lbRedirect', field: 'redirect', title: i18n.t('network.text_368') }),
      getProjectTableColumn(),
    ]
  },
}
