import { apiSlice } from "../slice/apiSlice";
const ADMIN_URL = '/api/admin';

export const adminapiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        adminlogin:builder.mutation({
            query:(data)=>({
                url:`${ADMIN_URL}/adminlogin`,
                method:'POST',
                body:data,
            })
        }),
        adminlogout:builder.mutation({
            query:(data)=>({
                method:"POST",
                url:`${ADMIN_URL}/adminlogout`,
                body:data
            })
        }),
        getusers:builder.mutation({
            query:()=>({
                url:`${ADMIN_URL}/userslist`,
                method:'GET'
            })
        }),
        adminupdateUser:builder.mutation({
            query:(data)=>({
                method:"PUT",
                url:`${ADMIN_URL}/updateuser`,
                body:data
            })
        }),
        deleteuser: builder.mutation({
            query: (userId) => ({
                method: "DELETE",
                url: `${ADMIN_URL}/userslist/${userId}`,
            })
        })
    })

})
export const {
    useAdminloginMutation,
    useAdminlogoutMutation,
    useGetusersMutation,
    useAdminupdateUserMutation,
    useDeleteuserMutation,
} = adminapiSlice