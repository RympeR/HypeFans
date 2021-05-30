import ProfileApi from '../../api/user/profile/api';

export class AuthStore {
    token = null;
    api = ProfileApi();

    constructor() {}

    async login(email, password) {
        this.token = await this.api.login(email, password);
        return this.token;
    }
    async logout() {
        await this.api.logout();
    }
}