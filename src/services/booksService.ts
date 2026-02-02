import { api } from '@/lib/axios';

export const createBook = async (payload: any) => {
    try {
        const res = await api.post('/books/create', payload);
        return res.data;
    } catch (error) {

    }
}


export const getBookById = async (id: string) => {
    try {
        const res = await api.get(`/book/${id}`);
        return res.data
    } catch (error) {

    }
}