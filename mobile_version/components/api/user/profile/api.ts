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
    const result = await this.elAxios.post('/user/create-user/', {
      email,
      username,
      password
    });
    if (result.status !== 201) {
      throw 'Registration error!';
    }
  }

  public async login(email: string, password: string) {
    console.log({
      email,
      password
    });
    const res = await this.elAxios.post('/auth/token/login/', {
      email,
      password
    });
    if (res.status !== 200) throw res;
    const profile: TokenVerify = res.data; // deserialize(res.data, TokenVerify);
    this.token = profile.auth_token;
    return this.token;
  }

  public async logout() {
    const result = await this.elAxios.post('/auth/token/logout/');
    if (result.status !== 204) throw result;
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
    if (res.status !== 200) {
      throw 'Error!';
    }
    const result: UserGet = res.data;
    return result;
  }

  public async deleteUser() {
    const result = await this.elAxios.delete(`user/update-delete-user/`);
    if (result.status !== 204) {
      throw `Cann't delete!`;
    }
  }

  public async userValidate(userID: number, photo: any) {
    const res = await this.elAxios.post('auth/users/validate_user/', {
      user: userID,
      photo: photo
    });
    return res.data;
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
    const result = await this.elAxios.put(`user/partial-update-user/`, dataSend);
    if (result.status !== 200) {
      throw 'Error!';
    }
    return result;
  }

  public async deleteCard(id: number) {
    const res = await this.elAxios.delete(`user/update-delete-card/${id}`);
    if (res.status !== 204) {
      throw 'Can not delete the card!';
    }
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

    if (res.status !== 201) {
      throw 'Can not create a new card';
    }
    return res;
  }

  public async getCardsList() {
    const res = await this.elAxios.get('user/user-cards-list/');
    if (res.status !== 200) {
      throw 'Can not create a new card';
    }
    const result: Array<CardGet> = res.data.results;
    return result;
  }

  public async createPayment(amount: number, cardID: number) {
    const res = await this.elAxios.post('user/create-payment/', {
      amount,
      card: cardID
    });
    if (res.status !== 201) {
      throw 'Can not create a new payment';
    }
    return res;
  }

  public async getPayments() {
    const res = await this.elAxios.get('/user/user-payment-history/');
    if (res.status !== 200) {
      throw `Cann't get payments`;
    }
    return res.data.results;
  }

  public async createDonation(amount: number, sender: number, reciever: number) {
    const res = await this.elAxios.post(`user/create-donation/`, { amount, sender, reciever });
    if (res.status !== 201) {
      throw 'Can not create a new payment';
    }
    return res;
  }

  //sended = true, else recieved
  public async getDonations(sended: boolean) {
    const query = sended ? '/user/user-donation-sended/' : '/user/user-donation-recieved/';
    const res = await this.elAxios.get(query);
    if (res.status !== 200) {
      throw 'Can not get donations';
    }
    return res.data.results;
  }
}
