import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createBook, getBookById } from "./booksService"

export const useCreateBooks = (bookData: any) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createBook(bookData),
        onSuccess: () => {
            // Refresh the books list after creating
            queryClient.invalidateQueries({ queryKey: ['books'] });
        },
    })
}
export const useGetBook = (id: string) => {
    return useQuery({
        queryKey: ['book', id],
        queryFn: () => getBookById(id),  // Your service function
        enabled: !!id,  // Only fetch if id exists
    });
};