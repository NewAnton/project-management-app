import { Board } from 'types/kanbanApiTypes';
import { kanbanApi } from './kanbanApi';

export const kanbanApiBoards = kanbanApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<Board[], void>({
      query: () => ({
        url: `/boards`,
        method: 'GET',
      }),
    }),
    createBoard: builder.mutation<Board, { title: string; owner: string; users: string[] }>({
      query: (payload) => ({
        url: `/boards`,
        method: 'POST',
        body: payload,
      }),
    }),
    getBoardById: builder.query<Board, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'GET',
      }),
    }),
    updateBoardById: builder.mutation<Board, Board>({
      query: (payload) => ({
        url: `/boards/${payload._id}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    deleteBoardById: builder.mutation<Board, string>({
      query: (boardId) => ({
        url: `/boards/${boardId}`,
        method: 'DELETE',
      }),
    }),
    getBoardsByIdsList: builder.query<Board[], string[]>({
      query: (payload) => ({
        url: `/boardsSet`,
        method: 'GET',
        params: { ids: payload },
      }),
    }),
    getBoardsByUserId: builder.query<Board[], string>({
      query: (userId) => ({
        url: `/boardsSet/${userId}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllBoardsQuery,
  useCreateBoardMutation,
  useGetBoardByIdQuery,
  useUpdateBoardByIdMutation,
  useDeleteBoardByIdMutation,
  useGetBoardsByIdsListQuery,
  useGetBoardsByUserIdQuery,
} = kanbanApiBoards;