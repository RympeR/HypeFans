import Api from './api';
import { UserGet } from './types';
export default class Profile {
  private api: Api;
  private userID: number;
  private dataProfile: UserGet;
  private token: string;
  constructor() {
    this.token = localStorage.token;
    this.api = new Api(this.token || null);
    this.userID = 0;
  }
  public async login(login: string, password: string) {
    const result = await this.api.login(login, password);
    localStorage.token = result;
    this.api = new Api(result);
    return result;
  }

  async logout() {
    const result = await this.api.logout();
    localStorage.removeItem('token');
    this.api = new Api();
    return result;
  }
  public async register(email: string, username: string, password: string) {
    const result = await this.api.register(email, username, password);
    // console.log(result);
    // .then((data) => console.log(data))
    // .catch((error) => console.error(error));
  }

  public async deleteUser(id: number) {
    await this.api.deleteUser(id);
  }

  public async createCard(number: number, date_year: string, cvc: string, creator: boolean) {
    await this.api
      .createCard(number, date_year, cvc, creator, this.userID)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  public async createPayment(amount: number, cardID: number) {
    await this.api
      .createPayment(amount, cardID)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  public async getDonation(id: number) {
    await this.api
      .getDonation(id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  public async getPayment(id: number) {
    await this.api
      .getPayment(id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  //details of current profile
  public async getProfile() {
    this.dataProfile = await this.api.getProfile();
    return this.dataProfile;
  }

  //details of current profile
  public async deleteCard(id: number) {
    await this.api
      .deleteCard(id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  public async updateUser(password: string, data: any) {
    await this.api.userUpdate(this.dataProfile.email, this.dataProfile.username, password, data);
  }

  public async validate(verified: boolean) {
    await this.api
      .userValidate(verified, this.userID)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
}
