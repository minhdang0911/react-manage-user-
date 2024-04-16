import axios from './customize-axios';
const FetchAllUser = (page) => {
    return axios.get(`api/users?page=${page}`);
};

export { FetchAllUser };
