import { apiQueryAllproject } from '../api'


export default {
    state: {
        projectData: ""
    },
    getters: {
        projectData: state => state.projectData
    },
    actions: {
        async initStore({ commit }) {
            await apiQueryAllproject()
                .then(res => {
                    commit('SET_PROJECT', res.data)
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    mutations: {
        SET_PROJECT(state, projectData) {
            state.projectData = projectData
        }
    }
}