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
            return getTest(apiQueryTableMasterByTableId(tableId), commit, 'SET_MASTER_ONE_TABLE')
        }
    },
    mutations: {
        SET_MASTER_ONE_TABLE(state, tableMaster) {
            state.tableMaster = tableMaster;
        }
    }

}

export function getTest(api, commit, mutationType) {
    let promise = new Promise((resolve, reject) => {
        api.then(res => {
            commit(mutationType, res.data[0])
            return resolve()
        }).catch(error => {
            console.log(error);
            return reject()
        })
    })
    return promise
}