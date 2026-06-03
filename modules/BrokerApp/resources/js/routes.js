import BrokerAppWorkspace from './views/BrokerAppWorkspace.vue'

export default [
  {
    path: '/brokerapp/loans',
    name: 'brokerapp-loans',
    component: BrokerAppWorkspace,
    meta: {
      title: 'BrokerApp Loan Workspace',
      scrollToTop: false,
    },
  },
]
