
export const INVOICE_TYPE_EMUN = {
    purchase: "采购",
    orderPlan: "订货计划单",
    orderArrival: "采购到货单",
    orderReturn: "采购退货单",
    // dispatchArrival: "急件到货单",
    sale: "销售",
    customerOrder: "客户订单",
    saleOut: "销售开单",
    saleReturn: "销售退货单",
    store: "仓储",
    storeTake: "盘点单",
    storeMove: "移仓单",
    finance: "出纳",
    stetementList: "应收应付对账单"
}


export const PRINT_KEY_LIST = Object.keys(INVOICE_TYPE_EMUN).map(key => key);

export const INVOICE_TREE = [
    {
        key: "purchase",
        disabled: true,
        children: [
            {
                key: "orderPlan",
            },
            {
                key: "orderArrival",
            },
            {
                key: "orderReturn",
            },
            // {
            //     key: "dispatchArrival",
            // },
        ]
    },
    {
        key: "sale",
        disabled: true,
        children: [
            {
                key: "customerOrder",
            },
            {
                key: "saleOut",
            },
            {
                key: "saleReturn",
            },
        ]
    },
    {
        key: "store",
        disabled: true,
        children: [
            {
                key: "storeTake",
            },
            {
                key: "storeMove",
            },
        ]
    },
    {
        key: "finance",
        disabled: true,
        children: [
            {
                key: "stetementList"
            }
        ]
    }
]

export const PRINT_TAPES = {
    purchaseNormal: "采购订单",
    purchaseReceive: "采购到货单",
    purchaseReturn: "采购退货单",
    salesNormal: "销售订单",
    salesOut: "销售出库单",
    salesReturn: "销售退货单",
    storeReceive: "验收单",
    storeIn: "入库单",
    storePick: "拣货单",
    storeOut: "验货出库单",
    storeTake: "盘点单",
    storeMove: "移仓单",
    logsReceipt: "收款凭证",
    logsProof: "付款凭证",
    statementsDetail: "往来对账账单"
}
