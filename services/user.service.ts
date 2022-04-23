import { httpClient } from "~/services";
import { User } from "~/utils";



export const userService = {

    login: async (loginData: User) => {
        const response = handleAuthorizedResponse(await httpClient.post({ url: "/users/login", payload: loginData }));
        const { token, ...user } = response.data;

        if (response.status === 200 && token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
    },
    logout: () => {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
    }

}

function handleAuthorizedResponse(response: any) {
    if (response?.status === 401) {
        // auto logout if 401 response returned from api
        userService.logout();
        location.reload();
        return;
    }
    return response;
}