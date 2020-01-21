const baseState = {
    showSample: true,
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
    headerData: {},
    detailsData: []
}

function editState() {
    return {
        type: "edit",
        ...baseState
    }
}

function temState() {
    return {
        type: "tem",
        ...baseState
    }
}


const actions = {
    async initStoreData({ commit }, payload) {
        const { typeEmun, baseFiles, temData, showSample, invoiceData } = payload;
        await commit("setShowSample", showSample);
        await commit("setTypeEmun", typeEmun);
        await commit("setBaseFiles", baseFiles);
        await commit("setTemplateData", temData);
        await commit("initInvoiceData", invoiceData);
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

const baseMutations = {
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
    setTemplateData(state, templateData) {
        state.invoice = {
            name: templateData.name,
            type: templateData.type,
            id: templateData.id,
        };
        const content = templateData.content ? JSON.parse(templateData.content) : {};
        const contentData = {
            templateHeader: [],
            templateBody: [],
            templateFooter: [],
            ...content,
        }

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
    setShowSample(state, showSample = true) {
        state.showSample = showSample;
    },
    initInvoiceData(state, invoiceData) {
        if (state.showSample) {
            const headerData = {
                printCount: 0,
                companyName: "[公司名称]"
            }
            const detailsData = [{}];
            const sampleData = detailsData[0];
            state.baseBodys.forEach(item => {
                if (item.file) {
                    sampleData[item.file] = item.disValue;
                }
            });
            state.baseHeaders.forEach(item => {
                headerData[item.file] = `[${item.disValue}]`
            })
            state.headerData = headerData;
            state.detailsData = detailsData;
        } else if (invoiceData) {
            state.headerData = invoiceData.header;
            state.detailsData = invoiceData.details;
        }
    }
}

const editMutations = {
    ...baseMutations,
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

const temMutations = {
    ...baseMutations,
}

export const editInvoice = {
    state: editState,
    actions,
    getters,
    mutations: editMutations
}

export const invoiceTemplate = {
    state: temState,
    actions,
    getters,
    mutations: temMutations
}