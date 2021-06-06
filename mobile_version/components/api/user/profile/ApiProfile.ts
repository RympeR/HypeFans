import { AsyncStorage } from 'react-native';
import Api from './api';
import { CardGet, DonationGet, PaymentGet, UserGet } from './types';
export default class ApiProfile {
  private api: Api;
  private userID: number;
  public dataProfile: UserGet;
  public cards: Array<CardGet>;
  public payments: Array<PaymentGet>;
  public donationsSended: Array<DonationGet>;
  public donationsRecieved: Array<DonationGet>;

  public token: string;
  constructor(token = null) {
    //TODO: make get token in the other procedure
    if(token) this.token = token;
    
    this.api = new Api(this.token || null);
    this.userID = 0;
  }

  private setToken(token: string): void {
    if (token) {
      AsyncStorage.setItem('token',token);
      console.log("settoken"+token);
      this.api = new Api(token);
    } else {
      AsyncStorage.removeItem('token')
      this.api = new Api();
    }
  }

  public async login(login: string, password: string) {
    const result = await this.api.login(login, password);
    console.log(result);
    this.setToken(result);
    return result;
  }

  public async logout() {
    if (this.token) {
      this.setToken('');
      const result = await this.api.logout();
      return result;
    } else throw 'Unregistred';
  }
  public async register(email: string, username: string, password: string) {
    const result = await this.api.register(email, username, password);
    this.setToken(result.data);
  }

  public async deleteUser() {
    await this.api.deleteUser();
    this.setToken('');
  }

  public async createCard(number: string, date_year: string, cvc: string, creator: boolean) {
    await this.api.createCard(number, date_year, cvc, creator, this.dataProfile.pk);
  }

  public async getCardsList() {
    this.cards = await this.api.getCardsList();
  }

  public async createPayment(amount: number, card: CardGet) {
    return await this.api.createPayment(amount, card.id);
  }

  public async getPayments() {
    this.payments = await this.api.getPayments();
  }

  public async createDonation(amount: number, userReciever: UserGet) {
    return await this.api.createDonation(amount, this.dataProfile.pk, userReciever.pk);
  }

  public async getDonationSended() {
    await this.api
      .getDonations(true)
      .then((data) => (this.donationsSended = data))
      .catch((error) => console.error(error));
  }

  public async getDonationReceived() {
    await this.api
      .getDonations(false)
      .then((data) => (this.donationsRecieved = data))
      .catch((error) => console.error(error));
  }

  //details of current profile
  public async getProfile() {
    this.dataProfile = await this.api.getProfile();
    return this.dataProfile;
  }

  //details of current profile
  public async deleteCard(card: CardGet) {
    await this.api
      .deleteCard(card.id)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  public async updateUser(password: string, data: any) {
    await this.api.userUpdate(this.dataProfile.email, this.dataProfile.username, password, data);
  }

  public async validate(user: UserGet, filePhoto: any) {
    return await this.api.userValidate(user.pk, filePhoto);
  }

  public validateLogin(param: string): boolean{
    return (param.length>2);
  }
  public validatePassword(param: string): boolean{
    return (param.length>2);
  }
  public validateEmail(param: string): boolean{
    return (param.length>2);
  }
}
