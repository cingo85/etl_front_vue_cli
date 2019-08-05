import { apiQueryAllproject } from '../api'


export default {
    state: {
        projectData: ""
    },
    getters: {},
    mutations: {},
    actions: {
        getList(context) {
            apiQueryAllproject().then(res => {
                context.commit(this.projectData = res.data)
            });
        }
    }
}