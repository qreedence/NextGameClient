import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://localhost:7145/'
});

export const testAsync = async () => {
        const response = await apiClient.get('/api/test/noparam');
        return response.data;
    }

export default testAsync;