import axios from 'axios';

const url = "http://localhost:5000/employees";

export const getallUsers = async (id?: string) => {
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addUser = async (user: any) => {
    return await axios.post(url,user);
}

export const editUser = async (id: string, user: any) => {
    return await axios.put(`${url}/${id}`,user);
}

export const deleteUser = async (id: string) => {
    return await axios.delete(`${url}/${id}`);
}