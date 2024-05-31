import {apiSlice} from "../slice/apiSlice.js";

const USER_URL = "/api/users";

export const userapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
} = userapiSlice;
