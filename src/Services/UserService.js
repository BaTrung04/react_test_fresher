import axios from './Customize-axios';
const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", { name, job });
}
const updateUser = (name, job) => {
    return axios.put("/api/users/1", { name, job })
}
export { fetchAllUser, postCreateUser, updateUser };