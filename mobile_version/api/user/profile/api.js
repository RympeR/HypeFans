import axios from "axios";

export class ProfileApi{
    constructor(token = null) {
        this.axios = axios.create({
            baseURL: 'https://hype-fans.com/',
            headers: {
                authorization: token ? `Token ${token}` : null
            },
            xsrfCookieName: 'csrftoken',
            xsrfHeaderName: 'x-csrftoken',
        })
    }

    async register(email, username, password) {
        await axios.post('user/create-user/', {
            params: {
                email,
                username,
                password
            }
        });
    }

    async login(email, password) {
        const res = await axios.post('auth/token/login/', {
            params: {
                email,
                password
            }
        });
        this.token = res.auth_token;
        return this.token;
    }

    async logout() {
        await axios.post('auth/token/logout/', );
    }

    async setUserPassowrd(){
        const res = await axios.post('auth/users/set_password/', );
        return res;
    }

    async getUserID() {
        const res = await axios.get('auth/users/me/', );
        return res;
    }

    async getUser(){
        const res = await axios.get('user/get-user/', );
        return res;
    }

    async updateUser(userObj){
        const res = await axios.get('user/update-delete-user/', {
            params: userObj
        });
        return res;
    }

    async deleteUser(){
        const res = await axios.get('user/update-delete-user/', );
        return res;
    }

}
