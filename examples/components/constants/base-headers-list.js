export const BASE_HEADERS_LIST = {
    orderPlan: [
        {
            name: "公司名称",
            sampleData: "供应商公司名称",
            width: 2,
            file: "cooperatorName"
        },
        {
            name: "联系电话",
            sampleData: "供应商主联系电话",
            width: 1,
            file: "contactPhone"
        },
        {
            name: "业务日期",
            sampleData: "单据业务日期",
            width: 1,
            file: "createdAt",
            type: "date"
        },
        {
            name: "支付方式",
            sampleData: "单据支付方式",
            width: 1,
            file: "enhancedSettlementType"
        },
        {
            name: "发票类型",
            sampleData: "单据发票类型",
            width: 1,
            file: "invoiceType"
        },
        {
            name: "运费付款方",
            sampleData: "单据运费付款方",
            width: 1,
            file: "freightPayer"
        },
        {
            name: "单号",
            sampleData: "单据号",
            width: 1,
            file: "billNo"
        },
        {
            name: "大写",
            sampleData: "合计金额大写",
            width: 1,
            type: "uppercase",
            file: "taxedAmount"
        },
        {

            name: "合计金额",
            sampleData: "单据合计金额",
            width: 1,
            file: "taxedAmount"
        },
        {
            name: "备注",
            sampleData: "单据备注",
            width: 4,
            file: "remark"
        },
        {

            name: "制单人",
            sampleData: "制单人名称",
            width: 1,
            file: "createdByName"
        },
        {

            name: "业务人员",
            sampleData: "业务员名称",
            width: 1,
            file: "businessManName"
        },
        {

            name: "审核人",
            sampleData: "审核人名称",
            width: 1,
            file: "auditByName"
        },
        {

            name: "收货地址",
            sampleData: "单据收货地址",
            width: 3,
            type: "areaNames",
            file: "receiverAreaNames"
        },
        {

            name: "收货人",
            sampleData: "收货人名称",
            width: 1,
            file: "contactName"
        },
        {

            name: "收货电话",
            sampleData: "收货人电话",
            width: 1,
            file: "contactPhone"
        },
        {

            name: "预计到货日期",
            sampleData: "单据预计到货日期",
            width: 1,
            file: "arrivalDate"
        },
        {

            name: "提货方式",
            sampleData: "提货方式",
            width: 1,
            file: "pickMethod"
        },
        {

            name: "运输方式",
            sampleData: "运输方式",
            width: 1,
            file: "transportMethod"
        },
        {

            name: "包装方式",
            sampleData: "包装方式",
            width: 1,
            file: "packMethod"
        },
        {

            name: "物流公司",
            sampleData: "物流公司",
            width: 2,
            file: "logisticsName"
        },
        {

            name: "对方订单号",
            sampleData: "对方订单号",
            width: 1,
            file: "peerOrderNo"
        },
    ]
}