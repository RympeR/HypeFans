import axios, { AxiosInstance } from 'axios';
import { deserialize } from 'typescript-json-serializer';
import { CardGet, SetPassword, TokenVerify, UserGet } from './types';

export default class ProfileApi {
  private elAxios: AxiosInstance;
  private token: string | null;

  constructor(token: string | null = null) {
    this.elAxios = axios.create({
      baseURL: 'https://hype-fans.com/',
      headers: {
        authorization: token ? `Token ${token}` : null
      },
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'x-csrftoken'
    });
  }

  public async register(email: string, username: string, password: string) {
    await this.elAxios.post('/user/create-user/', {
      email,
      username,
      password
    });
  }

  public async login(email: string, password: string) {
    const res = await this.elAxios.post('/auth/token/login/', {
      email,
      password
    });
    const profile: TokenVerify = res.data; // deserialize(res.data, TokenVerify);
    this.token = profile.auth_token;
    return this.token;
  }

  public async logout() {
    await this.elAxios.post('/auth/token/logout/');
  }

  public async setPassword(new_password: string, current_password: string) {
    const res = await this.elAxios.post('auth/users/set_password/', {
      new_password,
      current_password
    });
    return deserialize(res.data, SetPassword);
  }

  //???
  public async getID() {
    const res = await this.elAxios.get('auth/users/me/');
    return res;
  }

  //details user's profile (authorised)
  public async getProfile() {
    const res = await this.elAxios.get('user/get-user/');
    const result: UserGet = res.data;
    return result;
  }

  public async deleteUser() {
    return await this.elAxios.delete(`user/update-delete-user/`);
  }

  public async userValidate(userID: number, photo: any) {
    const res = await this.elAxios.post('auth/users/validate_user/', {
      user: userID,
      photo: photo
    });
    return res.data;
  }

  //get donation details
  public async deleteCard(id: number) {
    return await this.elAxios.delete(`user/update-delete-card/${id}`);
  }

  public async userUpdate(email: string, username: string, password: string, data: any) {
    const dataSend: any = {
      email,
      username,
      password
    };
    for (const key in data) {
      dataSend[key] = data[key];
    }
    return await this.elAxios.put(`user/partial-update-user/`, dataSend);
  }

  //work with card and payments
  public async createCard(number: string, date_year: string, cvc: string, creator: boolean, userID: number) {
    const res = await this.elAxios.post('user/create-card/', {
      number,
      date_year,
      cvc,
      creator,
      user: userID
    });
    return res;
  }

  public async getCardsList() {
    const res = await this.elAxios.get('user/user-cards-list/');
    const result: Array<CardGet> = res.data.results;
    return result;
  }

  public async createPayment(amount: number, cardID: number) {
    const res = await this.elAxios.post('user/create-payment/', {
      amount,
      card: cardID
    });
    return res;
  }

  public async getPayments() {
    const res = await this.elAxios.get('/user/user-payment-history/');
    return res.data.results;
  }

  public async createDonation(amount: number, sender: number, reciever: number) {
    return await this.elAxios.post(`user/create-donation/`, { amount, sender, reciever });
  }

  //sended = true, else recieved
  public async getDonations(sended: boolean) {
    const query = sended ? '/user/user-donation-sended/' : '/user/user-donation-recieved/';
    const res = await this.elAxios.get(query);
    return res.data.results;
  }
}
