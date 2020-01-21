
export const INVOICE_TYPE_EMUN = {
    purchase: "采购",
    orderPlan: "订货计划单",
    orderArrival: "采购到货单",
    orderReturn: "采购退货单",
    dispatchArrival: "急件到货单",
    sale: "销售",
    customerOrder: "客户订单",
    saleOut: "销售出库单",
    saleReturn: "销售退货单"
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
            {
                key: "dispatchArrival",
            },
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

export const SIZE_OPTIONS = [
    {
        id: 1,
        name: "1/1",
        size: 31
    },
    // {
    //     id: 2,
    //     name: '1/2',
    //     size: 12
    // },
    // {
    //     id: 3,
    //     name: '1/3',
    //     size: 6
    // },
]

// 默认选中值
export const DEFAULT_SIZE_OPTION = SIZE_OPTIONS[0]

export const statementsColumns = [
    { name: "序号", width: "60", align: "center", prop: "index" },
    { name: "对账备注", prop: "remark" },
    { name: "应收金额", prop: "amount" },
    { name: "业务类型", prop: "sourceBillType" },
    { name: "业务单号", prop: "sourceBillNo" },
    { name: "业务员", prop: "businessManName" },
]