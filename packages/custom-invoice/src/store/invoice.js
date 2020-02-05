
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
    temDataSource: {
        templateHeader: [],
        templateBody: [],
        templateFooter: []
    },
    dataSource: {}
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
        await commit("setTemDataSource", temData);
        await commit("setDataSource", invoiceData);
    }
}

const getters = {
    templateHeader(state) {
        return state.temDataSource.templateHeader.map(item => {
            const baseData = state.baseHeaders.find(it => it.name === item.name);
            return baseData || null;
        }).filter(item => item);
    },
    templateFooter(state) {
        return state.temDataSource.templateFooter.map(item => {
            const baseData = state.baseHeaders.find(it => it.name === item.name);
            return baseData || null;
        }).filter(item => item);
    },
    templateBody(state) {
        return state.temDataSource.templateBody.map(temData => {
            return {
                ...temData,
                content: temData.content.map(value => {
                    let baseData;
                    state.baseBodys.forEach(base => {
                        if (!baseData) {
                            base.soureFile === temData.soureFile && base.content.forEach(it => {
                                if (it.name === value.name) {
                                    baseData = it;
                                }
                            })
                        }
                    })
                    return baseData ? {
                        ...baseData,
                        width: value.width || 100
                    } : null;
                }).filter(item => item)
            }
        })
    },
    altHeaderFiles(state, getters) {
        return state.baseHeaders
            .filter(item =>
                ![
                    ...getters.templateHeader,
                    ...getters.templateFooter
                ].find(it => it.name === item.name)
            )
    },
    altBodyFiles(state, getters) {
        return state.baseBodys.map(base => {
            return {
                ...base,
                content: base.content.filter(item => {
                    const curTem = getters.templateBody.find(item => item.soureFile === base.soureFile);
                    return curTem && !curTem.content.find(it => it.name === item.name)
                })
            }
        }
        )
    },
    headerData(state) {
        if (state.showSample) {
            const headerData = {
                printCount: 0,
                companyName: "[公司名称]"
            }
            state.baseHeaders.forEach(item => {
                headerData[item.file] = item.sampleData || item.name
            })
            return headerData;
        }
        return state.dataSource.header;
    },
    bodysData(state) {
        if (state.showSample) {
            let bodysData = {}
            state.baseBodys.forEach(item => {
                bodysData[item.soureFile] = [{}]
                item.content.forEach(it => {
                    {
                        bodysData[item.soureFile][0][it.file] = it.sampleData || it.name;
                    }
                });
            })
            return bodysData;
        }
        return state.dataSource;
    }
}

const baseMutations = {
    setTypeEmun(state, typeEmun) {
        state.typeEmun = typeEmun;
    },
    setBaseFiles(state, baseFiles) {
        if (!baseFiles || !baseFiles.baseHeaders || !baseFiles.baseBodys) {
            console.error("baseFiles 参数缺失", baseFiles)
            state.baseHeaders = []
            state.baseBodys = [
                {
                    tableName: "",
                    soureFile: "details",
                    content: []
                }
            ]
        } else {
            state.baseHeaders = baseFiles.baseHeaders.map(item => ({
                ...item,
                width: item.width || 1
            }));
            // 兼容单表格
            const firstData = baseFiles.baseBodys && baseFiles.baseBodys[0]
            if (firstData && firstData.soureFile) {
                state.baseBodys = baseFiles.baseBodys;
            } else {
                state.baseBodys = [{
                    tableName: "",
                    soureFile: "details",
                    content: baseFiles.baseBodys || []
                }];
            }
        }
    },
    setTemDataSource(state, templateData) {
        state.invoice = {
            name: templateData.name,
            type: templateData.type,
            id: templateData.id,
        };
        const content = templateData.content ? JSON.parse(templateData.content) : {};
        const firstData = content.templateBody && content.templateBody[0];
        state.temDataSource = {
            templateHeader: [],
            templateFooter: [],
            ...content,
            // 兼容旧数据
            templateBody: firstData && firstData.soureFile ? content.templateBody : state.baseBodys.map(item => ({
                ...item,
                content: content.templateBody || []
            }))
        }
    },
    setShowSample(state, showSample = true) {
        state.showSample = showSample;
    },
    setDataSource(state, invoiceData) {
        state.dataSource = invoiceData || {};
    }
}

const editMutations = {
    ...baseMutations,
    changeInvoiceName(state, name) {
        state.invoice.name = name;
    },
    changeTemplateHeader(state, data) {
        state.temDataSource = {
            ...state.temDataSource,
            templateHeader: data
        }
    },
    changeTemplateBody(state, data) {
        state.temDataSource.templateBody = data;
    },
    changeTemplateFooter(state, data) {
        state.temDataSource.templateFooter = data;
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