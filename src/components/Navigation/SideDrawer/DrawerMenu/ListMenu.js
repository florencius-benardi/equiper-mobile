/**
 * Documentation
 * 
 * path : link to url
 * key : define key for sidebar component, handling current active menu
 * name : displayed menu name in sidebar
 * icon : icon name for menu, please refer to https://ant.design/components/icon/
 * submenu : array of submenu, defined for collapsed child menu 
 * 
 */
const menu = [
    // dashboard
    {
        path: '/dashboard',
        key: 'dashboard',
        name: 'Dashboard',
        icon: 'pie-chart',
    },
    //master
    {
        path: '/master',
        key: 'master',
        name: 'Master',
        icon: 'database',
        submenu: [
            {
                path: '/master/material',
                key: 'material',
                name: 'Material',
                authobject: 'material-view',
            },
            {
                path: '/master/info-records',
                key: 'info-records',
                name: 'Info Records',
                authobject: 'material-vendor-view',
            },
        ]
    },
    //business partner
    {
        path: '/business-partner',
        key: 'business-partner',
        name: 'Business Partner',
        icon: 'deployment-unit',
        submenu: [
            {
                path: '/business-partner/location',
                key: 'location',
                name: 'Location',
                authobject: 'location-view',
            },
            {
                path: '/business-partner/vendor',
                key: 'vendor',
                name: 'Vendor',
                authobject: 'supplier-view',
            },
        ]
    },
    //inventory
    {
        path: '/inventory',
        key: 'inventory',
        name: 'Inventory',
        icon: 'audit',
        submenu: [
            {
                path: '/inventory/reservation',
                key: 'reservation',
                name: 'Reservation',
                authobject: 'reservation-view',
            },
            {
                path: '/inventory/purchase-requisition',
                key: 'purchase-requisition',
                name: 'Purchase Requisition',
                authobject: 'reservation-view',
            },
            {
                path: '/inventory/request-for-quotation',
                key: 'request-for-quotation',
                name: 'Request for Quotation',
                authobject: 'rfq-view',
            },
            {
                path: '/inventory/purchase-order',
                key: 'purchase-order',
                name: 'Purchase Order',
                authobject: 'purchase-orders-view',
            },
            {
                path: '/inventory/purchase-receipt',
                key: 'purchase-receipt',
                name: 'Purchase Receipt',
                authobject: 'purchase-orders-view',
            },
            {
                path: '/inventory/goods-movement',
                key: 'goods-movement',
                name: 'Goods Movement',
                authobject: 'goods-movement-view',
            },
            {
                path: '/inventory/goods-movement-report',
                key: 'goods-movement-report',
                name: 'Goods Movement Report',
                authobject: 'goods-movement-view',
            },
            {
                path: '/inventory/stock-overview',
                key: 'stock-overview',
                name: 'Stock Overview',
                authobject: 'stock-overview',
            },
            {
                path: '/inventory/stock-opname',
                key: 'stock-opname',
                name: 'Stock Opname',
                authobject: 'stock-opname-view',
            },
        ]
    },
    //inventory
    {
        path: '/warehouse-management',
        key: 'warehouse-management',
        name: 'Warehouse Management',
        icon: 'bank',
        submenu: [
            {
                path: '/warehouse-management/outbound-order',
                key: 'outbound-order',
                name: 'Outbound Order',
                authobject: 'purchase-orders-view',
            },
            {
                path: '/warehouse-management/outbound',
                key: 'Outbound',
                name: 'Outbound Process',
                authobject: 'purchase-orders-view',
            },
        ]
    },
    //delivery
    {
        path: '/delivery',
        key: 'delivery',
        name: 'delivery',
        icon: 'rocket',
        submenu: [
            {
                path: '/delivery/picking-list',
                key: 'picking-list',
                name: 'Picking List',
                authobject: 'picking-list-view',
            },
            {
                path: '/delivery/delivery-list',
                key: 'delivery-list',
                name: 'Delivery List',
                authobject: 'delivery-orders-view',
            },
        ]
    },
    //production
    {
        path: '/production',
        key: 'production',
        name: 'production',
        icon: 'schedule',
        submenu: [
            {
                path: '/production/bill-of-material',
                key: 'bill-of-material',
                name: 'Bill of Material',
                authobject: 'bom-view',
            },
            {
                path: '/production/production-schedule',
                key: 'production-schedule',
                name: 'Production Schedule',
                //authobject: 'production-schedule-view',
            },
            {
                path: '/production/production-order',
                key: 'production-order',
                name: 'Production Order',
                authobject: 'production-order-view',
            },
            {
                path: '/production/resource-requirement',
                key: 'resource-requirement',
                name: 'Resource Requirement',
                authobject: 'production-order-view',
            },
            {
                path: '/production/production-confirmation',
                key: 'production-confirmation',
                name: 'Production Confirmation',
                //authobject: 'production-order-view',
            },
        ]
    },
    //System
    {
        path: '/system-settings',
        key: 'system-settings',
        name: 'System Settings',
        icon: 'setting',
    },
];

export default menu;