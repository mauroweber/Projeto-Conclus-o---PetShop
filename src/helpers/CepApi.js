import axios from 'axios'

const CepApi = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
})

export default CepApi