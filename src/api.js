import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8093/api/'

/*
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:8093/api/';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = '';
} else {
    axios.defaults.baseURL = 'http://localhost:8093/api/';
}*/

//User Api
const userRequest = axios.create({
    baseURL: 'http://localhost:8093/api/t_member'
});

export const apiUserRegister = data => userRequest.post('/createNewmember', data);
export const apiUserLogin = data => userRequest.post('/Login', data)



//Project Api
const projectRequest = axios.create({
    baseURL: 'http://localhost:8093/api/t_project'
});
export const apiQueryAllproject = () => projectRequest.get('/queryAllproject');
export const apiCreateNewProject = data => projectRequest.post('/createNewProject', data);
export const apiCloseProject = data => projectRequest.post('/closeProject', data)


//DataSource Api
const datasourceRequest = axios.create({
    baseURL: 'http://localhost:8093/api/t_datasource'
});
export const apiCreateNewDataBase = data => datasourceRequest.post('/createNewDataBase', data)
export const apiQueryDataBaseByprojectId = data => datasourceRequest.post('/queryDataSourceByProjectId', data)

//TableMaster api
const tableMasterRequest = axios.create({
    baseURL: 'http://localhost:8093/api/t_table_master'
})
export const apiUpdateTableMaster = data => tableMasterRequest.post('/updatet_table_master', data);
export const apiQueryTableMaster = () => tableMasterRequest.get('/queryAlltableMaster');
