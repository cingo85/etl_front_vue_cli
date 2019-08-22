import { apiQueryTableMasterByProjectId } from '../api'


export default {
    state: {
        tableMaster: ""
    },
    getters: {

    },
    actions: {
        loadingProject({ commit }, tableId) {
            console.log(tableId);
            apiQueryTableMasterByProjectId(tableId)
                .then(res => {
                    console.log(res);
                    commit('SETMaster', res.data)
                }).catch(error => {
                    console.log(error);
                })
        }
    },
    mutations: {

    }

}