import axios from 'axios'

const sucess = res => res
const error = err => {
    if (401=== err.resonse.status) {
        window.location = '/'
    } else {
        return Promisse.reject(err)
    }
}

axios.interceptors.response.use(sucess, error)