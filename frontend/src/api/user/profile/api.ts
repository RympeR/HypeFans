import axios, { AxiosInstance } from 'axios';
import { deserialize } from 'typescript-json-serializer';
import { CardGet, DonationGet, PaymentGet, PendingUserCreation, SetPassword, TokenVerify, UserGet } from './types';

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
    //callback???
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
    console.log(res.data);
    const result: UserGet = res.data;
    return result;
  }

  public async createCard(number: number, date_year: string, cvc: string, creator: boolean, userID: number) {
    const res = await this.elAxios.post('user/create-card/', {
      number,
      date_year,
      cvc,
      creator,
      user: userID
    });
    return res;
  }

  public async createPayment(amount: number, cardID: number) {
    const res = await this.elAxios.post('user/create-payment/', {
      amount,
      card: cardID
    });
    return res;
  }

  //get data card details
  public async getCard(id: number) {
    const res = await this.elAxios.post(`user/get-card/${id}`, {
      token: this.token
    });
    return deserialize(res.data, CardGet);
  }

  //get donation details
  public async getDonation(id: number) {
    const res = await this.elAxios.post(`user/get-donation/${id}`, {
      token: this.token
    });
    return deserialize(res.data, DonationGet);
  }

  //get donation details
  public async getPayment(id: number) {
    const res = await this.elAxios.post(`user/get-payment/${id}`, {
      token: this.token
    });
    return deserialize(res.data, PaymentGet);
  }

  public async deleteUser(id: number) {
    return await this.elAxios.delete(`user/update-delete-user/${id}`);
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

  public async userValidate(verified: boolean, userID: number) {
    const res = await this.elAxios.post('auth/users/validate_user/', {
      verified,
      user: userID
    });
    return deserialize(res.data, PendingUserCreation);
  }
}
