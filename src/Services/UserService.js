import axios from './customize-axios';
const FetchAllUser = (page) => {
    return axios.get(`api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
    return axios.post('api/users', { name, job });
};

const putUpdateUser = (userId, name, job) => {
    return axios.put(`api/users/${userId}`, { name, job });
};

export { FetchAllUser, postCreateUser, putUpdateUser };
