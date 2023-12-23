import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'
import { RootState } from '../store'

const clientAdapter = createEntityAdapter({})

const initialState = clientAdapter.getInitialState()


interface ClientResponse {
  _id: string
  client: string
  picturePath: string
  description: string
  date: string
  active: boolean
}

interface Client {
  id: string
  client: string
  picturePath: string
  description: string
  date: string
}

export const clientApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getClients: builder.query<Client[], void>({
      query: () => ({
        url: '/clients',
        validateStatus: (response, result) => response.status === 200 && !result.isError,
      }),
      keepUnusedDataFor: 5,
      transformResponse: (rawResult: ClientResponse[]) => {
        const clients: Client[] = rawResult.map((client) => {
          return {
            ...client,
            id: client._id
          }
        })
        return clients
      },
      providesTags: (result) => result ? [ ...result.map(({ id }) => ({ type: 'Clients' as const, id })),
        { type: 'Clients', id: 'LIST' }
        ]
        : [{ type: 'Clients', id: 'LIST' }],
    }),
    addNewClient: builder.mutation({
      query: initialClientData => ({
        url: '/clients',
        method: 'POST',
        body: {
          ...initialClientData
        }
      }),
      invalidatesTags: [
        { type: 'Clients', id: 'LIST' }
      ]
    })
  })
})

export const {
  useGetClientsQuery,
  useAddNewClientMutation
} = clientApiSlice

export const selectClientsResult = clientApiSlice.endpoints.getClients.select()

const selectClientsData = createSelector(selectClientsResult, clientsResults => clientsResults.data)

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds
} = clientAdapter.getSelectors((state: RootState) => selectClientsData(state) ?? initialState)