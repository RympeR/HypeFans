import axios from "axios";

export class PostsApi{
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

    async createPost(){
        const res = await axios.get('/blog/create-attachment/', );
        return res;
    }

}
