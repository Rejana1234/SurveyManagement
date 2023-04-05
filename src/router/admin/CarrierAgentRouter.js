export default [
    {
        path: 'carrier_agent',
        name: 'CarrierAgent',
        component: () => import('../../views/admin/carrier_agent/CarrierAgent.vue')
    },

    {
        path: 'add_carrier_agent',
        name: 'AddCarrierAgent',
        component: () => import('../../views/admin/carrier_agent/AddCarrierAgent.vue')
    },

    {
        path: 'edit_carrier_agent/:id',
        name: 'EditCarrierAgent',
        component: () => import('../../views/admin/carrier_agent/EditCarrierAgent.vue')
    }
]