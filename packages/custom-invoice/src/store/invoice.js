
function state() {
    return {
        typeEmun: {},
        invoice: {
            name: "",
            type: "",
            id: ""
        },
        baseHeaders: [],
        baseBodys: [],
        templateHeader: [],
        templateBody: [],
        templateFooter: [],
    }
}

const getters = {
    altHeaderFiles(state) {
        return state.baseHeaders
            .filter(item =>
                ![
                    ...state.templateHeader,
                    ...state.templateFooter
                ].find(it => it.name === item.name)
            )
    },
    altBodyFiles(state) {
        return state.baseBodys
            .filter(item =>
                !state.templateBody.find(it => it.name === item.name)
            )
            .map(item => ({
                width: item.width || 100,
                ...item
            }));
    },
}

export const mutations = {
    setTypeEmun(state, typeEmun) {
        state.typeEmun = typeEmun;
    },
    setBaseFiles(state, baseFiles) {
        if (!baseFiles || !baseFiles.baseHeaders || !baseFiles.baseBodys) {
            console.error("baseFiles 参数缺失", baseFiles)
            state.baseHeaders = []
            state.baseBodys = []
        } else {
            state.baseHeaders = baseFiles.baseHeaders;
            state.baseBodys = baseFiles.baseBodys;
        }
    },
    setTemplateData(state, invoiceData) {
        state.invoice = {
            name: invoiceData.name,
            type: invoiceData.type,
            id: invoiceData.id,
        };
        const contentData = invoiceData.content ? {
            templateHeader: [],
            templateBody: [],
            templateFooter: [],
            ...invoiceData.content,
        }: {
            templateHeader: [],
            templateBody: [],
            templateFooter: [],
        };

        /**
         * 1、基于字段名设置，采用本地备选数据
         * 2、过滤掉备选字段已经取消的数据
         */

        state.templateHeader = contentData.templateHeader.map(item => {
            const baseData = state.baseHeaders.find(it => it.name === item.name);
            return baseData || "";
        }).filter(item => item);

        state.templateFooter = contentData.templateFooter.map(item => {
            const baseData = state.baseHeaders.find(it => it.name === item.name);
            return baseData || "";
        }).filter(item => item);

        state.templateBody = contentData.templateBody.map(item => {
            const baseData = state.baseBodys.find(it => it.name === item.name);
            if (baseData) {
                return {
                    ...baseData,
                    width: item.width
                }
            }
            return "";
        }).filter(item => item);
    },
    changeInvoiceName(state, name) {
        state.invoice.name = name;
    },
    changeTemplateHeader(state, data) {
        state.templateHeader = data;
    },
    changeTemplateBody(state, data) {
        state.templateBody = data;
    },
    changeTemplateFooter(state, data) {
        state.templateFooter = data;
    }
}

export const editInvoice = {
    namespaced: true,
    state,
    getters,
    mutations
}

export const invoiceTemplate = {
    state,
    getters,
    mutations
}