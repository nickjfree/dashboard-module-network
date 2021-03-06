<template>
  <base-dialog @cancel="cancelDialog">
    <div slot="header">{{params.title}}</div>
    <div slot="body">
      <dialog-selected-tips :name="$t('dictionary.network')" :count="params.data.length" :action="params.title" />
      <dialog-table class="mb-2" :data="params.data" :columns="params.columns.slice(0, 3)" />
      <a-form :form="form.fc" v-bind="formItemLayout">
        <a-form-item :label="$t('common_498')">
          <a-switch v-decorator="decorators.is_auto_alloc" />
          <template slot="extra">{{$t('common_500')}}</template>
        </a-form-item>
      </a-form>
    </div>
    <div slot="footer">
      <a-button type="primary" @click="handleConfirm" :loading="loading">{{ $t('dialog.ok') }}</a-button>
      <a-button @click="cancelDialog">{{ $t('dialog.cancel') }}</a-button>
    </div>
  </base-dialog>
</template>

<script>
import DialogMixin from '@/mixins/dialog'
import WindowsMixin from '@/mixins/windows'

export default {
  name: 'NetworkUpdateIsAutoAllocDialog',
  mixins: [DialogMixin, WindowsMixin],
  data () {
    return {
      loading: false,
      form: {
        fc: this.$form.createForm(this),
      },
      decorators: {
        is_auto_alloc: [
          'is_auto_alloc',
          {
            initialValue: this.params.data.length === 1 ? this.params.data[0].is_auto_alloc : this.params.data.every(item => item.is_auto_alloc),
            valuePropName: 'checked',
          }],
      },
      formItemLayout: {
        wrapperCol: {
          span: 21,
        },
        labelCol: {
          span: 3,
        },
      },
    }
  },
  methods: {
    async handleConfirm () {
      this.loading = true
      try {
        const values = await this.form.fc.validateFields()
        const ids = this.params.data.map(item => item.id)
        if (ids.length > 1) {
          await this.params.onManager('batchUpdate', {
            ids,
            managerArgs: {
              data: values,
            },
          })
        } else {
          await this.params.onManager('update', {
            id: ids[0],
            managerArgs: {
              data: values,
            },
          })
        }
        this.cancelDialog()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
