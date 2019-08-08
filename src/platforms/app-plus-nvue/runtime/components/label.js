import {
  emitter,
  listeners
} from '../mixins'

function getLabel (weex) {
  return {
    name: 'Label',
    mixins: [emitter, listeners],
    props: {
      for: {
        type: String,
        default: ''
      }
    },
    methods: {
      _onClick: function _onClick ($event) {
        let stopPropagation = /^uni-(checkbox|radio|switch)-/.test($event.target.className)
        if (!stopPropagation) {
          stopPropagation = /^uni-(checkbox|radio|switch|button)$/i.test($event.target.tagName)
        }
        if (stopPropagation) {
          return
        }

        if (this.for) {
          this.$emit('uni-label-click-' + this.$page.id + '-' + this.for, $event, true)
        }
        else {
          this.$broadcast(['Checkbox', 'Radio', 'Switch', 'Button'], 'uni-label-click', $event, true)
        }
      }
    },
    render (createElement) {
      const _vm = this
      return createElement('div', _vm._g({
        on: {
          'click': _vm._onClick
        }
      }, _vm.$listeners), [_vm._t('default')], 2)
    }
  }
}

export default function init (Vue, weex) {
  Vue.component('label', getLabel(weex))
}
