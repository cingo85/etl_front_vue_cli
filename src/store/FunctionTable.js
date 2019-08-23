import { apiQueryTableMasterByTableId } from '../api'


export default {
    state: {
        tableMaster: ""
    },
    getters: {
        tableMaster: state => state.tableMaster
    },
    actions: {
        loadingOneTableMaster({ commit }, tableId) {
            apiQueryTableMasterByTableId(tableId)
                .then(res => {
                    console.log("2");
                    commit('SET_MASTER_ONE_TABLE', res.data)
                }).catch(error => {
                    console.log(error);
                })
        }

        // loadingAllTableMaster({ commit }, projectId) {
        //     apiQueryTableMasterByProjectId(projectId)
        //         .then(res => {
        //             commit('SET_MASTER_ALL_TABLE', res.data)
        //         }).catch(error => {
        //             console.log(error);
        //         })
        // }
    },
    mutations: {
        SET_MASTER_ONE_TABLE(state, tableMaster) {
            state.tableMaster = tableMaster;
            console.log("2");
        }
    }

}