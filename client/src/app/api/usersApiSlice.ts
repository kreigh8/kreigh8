import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()


interface Users {
  _id: string
  email: string
  username: string
  active: boolean
}

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query<Users[], void>({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData: Users[]): Users[] => {
        usersAdapter.setAll(initialState, responseData)
        return responseData
      },
      providesTags: (result) => result ? [ ...result.map(({ _id }) => ({ type: 'Users' as const, _id })),
        { type: 'Users', id: 'LIST' }
        ]
        : [{ type: 'Users', id: 'LIST' }],
    })
  })
})