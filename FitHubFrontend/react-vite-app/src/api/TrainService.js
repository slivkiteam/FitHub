import axios from "axios";

const API_URL = 'http://localhost:8081/trains'

// export async function saveContact(train) {
//     return await axios.post(API_URL, train)
// }
export async function getContacts() {
    return await axios.get(API_URL);
}
// export async function getContact(id) {
//     return await axios.get(`${API_URL}/${id}`)
// }
// export async function updateContact(id,train) {
//     return await axios.patch(`${API_URL}/${id}`, train)
// }
// export async function deleteContact(id) {
//     return await axios.delete(`${API_URL}/${id}`)
// }