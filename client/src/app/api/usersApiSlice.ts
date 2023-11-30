import { createSelector, createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import { RootState } from '../store'

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
    getUsers: builder.query<EntityState<unknown>, void>({
      query: () => ({
        url: '/users',
        validateStatus: (response, result) => response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData: Users[]) => {
        return usersAdapter.setAll(initialState, responseData)
      },
      providesTags: (result) => result ? [ ...result.map(({ _id }) => ({ type: 'Users' as const, _id })),
        { type: 'Users', id: 'LIST' }
        ]
        : [{ type: 'Users', id: 'LIST' }],
    }),
    addNewUser: builder.mutation({
      query: initialUserData => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: [
        { type: 'Users', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetUsersQuery,
  useAddNewUserMutation
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data)

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state: RootState) => selectUsersData(state) ?? initialState)