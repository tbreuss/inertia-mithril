import {Inertia} from '@inertiajs/inertia'
import m from 'mithril'

const page = {
  component: {
    view: () => m('div')
  },
  props: {},
  key: null,
}

const app = {
  initialPage: {
    type: Object,
    required: true,
  },
  resolveComponent: {
    type: Function,
    required: true,
  },
  transformProps: props => props,
  oncreate: () => Inertia.init({
    initialPage: app.initialPage,
    resolveComponent: app.resolveComponent,
    updatePage: (component, props, {preserveState}) => {
      page.component = component
      page.props = app.transformProps(props)
      page.key = preserveState ? page.key : Date.now()
      m.redraw()
    },
  }),
  view: () => m(page.component, page.props),
}

export default app
