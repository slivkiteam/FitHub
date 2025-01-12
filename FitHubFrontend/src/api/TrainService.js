import axios from "axios";

const API_URL = 'http://212.41.6.237/api/trains'

export async function saveContact(train) {
    return await axios.post(API_URL, train)
}
export async function getContacts(page) {
    return await axios.get(`${API_URL}?page=${page}`);
}

export async function getContact(id) {
    return await axios.get(`${API_URL}/${id}`)
}
export async function updateContact(id,train) {
    return await axios.patch(`${API_URL}/${id}`, train)
}
export async function deleteContact(id) {
    return await axios.delete(`${API_URL}/${id}`)
}

export async function getMockContact() {
    return await axios.get("./trains_api.json")
}