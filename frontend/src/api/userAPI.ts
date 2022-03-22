import { instance } from "./api";
import {
  CardType,
  createCardRT,
  createDonationRT,
  createPaymentRT,
  createSubscriptionRT,
  createUserT,
  DonationType,
  getCardRT,
  getDonationRT,
  getPaymentRT,
  getUserRT,
  idType,
  onlineUserRetrieveRT,
  PaymentType,
  referralHistory,
  SubscriptionType,
  userDonationRecievedRT,
  userGetCardListRT,
  userGetPaymentHistoryRT,
  userSearchType,
  userStringType,
  userValidateUserRT,
} from "./types";

export const userAPI = {
  chatSubscribe({ source, target }: SubscriptionType) {
    return instance
      .post<createSubscriptionRT>(`/user/user-chat-subscription/${target}`, {
        source,
        target,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  createCard({ number, date_year, cvc, creator, user }: CardType) {
    return instance
      .post<createCardRT>("/user/create-card/", {
        number,
        date_year,
        cvc,
        creator,
        user,
      })
      .then((response) => {
        return response;
      });
  },
  blockUser({ user, block = true }: { user: Array<number>; block?: boolean }) {
    return instance
      .put("/user/block-user/", {
        user,
        block,
      })
      .then((response) => {
        return response;
      });
  },
  createDonation({ amount, sender, reciever }: DonationType) {
    return instance
      .post<createDonationRT>("/user/create-donation/", {
        amount,
        sender,
        reciever,
      })
      .then((response) => {
        return response;
      });
  },
  createPayment({ amount, card }: PaymentType) {
    return instance
      .post<createPaymentRT>("/user/create-payment/", {
        amount,
        card,
      })
      .then((response) => {
        return response;
      });
  },
  createSubscription({ source, target }: SubscriptionType) {
    return instance
      .post<createSubscriptionRT>("/user/create-subscription/", {
        source,
        target,
      })
      .then((response) => {
        return response;
      });
  },
  createUser({ email, username, password }: createUserT) {
    return instance
      .post<createUserT>("/user/create-user/", {
        email,
        username,
        password,
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log("registration error");
        }
        return response;
      });
  },
  getCard({ id }: idType) {
    return instance.get<getCardRT>(`user/get-card/${id}`).then((response) => {
      return response.data;
    });
  },
  getDonation({ id }: idType) {
    return instance
      .get<getDonationRT>(`user/get-donation/${id}`)
      .then((response) => {
        return response.data;
      });
  },
  getPayment({ id }: idType) {
    return instance
      .get<getPaymentRT>(`user/get-payment/${id}`)
      .then((response) => {
        return response.data;
      });
  },
  searchUser({ user, limit, offset }: userSearchType) {
    return instance
      .get(`user/user-search/?username=${user}&limit=${limit}&offset=${offset}`)
      .then((response) => {
        if (response.status === 200 || 301) {
          return response.data;
        } else {
          throw new Error();
        }
      });
  },
  getUser({ user }: userStringType) {
    return instance
      .get<getUserRT>(`user/get-profile/${user}`)
      .then((response) => {
        if (response.status === 200 || 301) {
          return response.data;
        } else {
          throw new Error();
        }
      });
  },
  getProfile() {
    return instance.get(`/user/get-user/`).then((response) => {
      return response.data;
    });
  },
  onlineUserCreate({ user }: userStringType) {
    return instance
      .post<userStringType>(`/user/online-user-create/`, { user })
      .then((response) => {
        return response.data;
      });
  },
  onlineUserRetrieve() {
    return instance
      .get<onlineUserRetrieveRT>(`/user/online-user-retrieve/`)
      .then((response) => {
        return response.data;
      });
  },
  onlineUserUpdatePut({ user }: userStringType) {
    return instance
      .put<userStringType>(`/user/online-user-update/`, { user })
      .then((response) => {
        return response.data;
      });
  },
  onlineUserUpdate({ user }: userStringType) {
    return instance
      .patch<userStringType>(`/user/online-user-update/`, { user })
      .then((response) => {
        return response.data;
      });
  },
  particialUpdateCard({ number, date_year, cvc, creator, user }: createCardRT) {
    return instance
      .put<createCardRT>(`/user/particial-update-card/`, {
        number,
        date_year,
        cvc,
        creator,
        user,
      })
      .then((response) => {
        return response.data;
      });
  },
  particialUpdateUser(props: getUserRT) {
    return instance
      .put<getUserRT>(`/user/particial-update-card/`, {
        ...props,
      })
      .then((response) => {
        return response.data;
      });
  },
  getSpends() {
    return instance.get(`/user/spend-stats-history/`).then((response) => {
      return response;
    });
  },
  geEarns() {
    return instance.get(`/user/pay-stats-history/`).then((response) => {
      return response;
    });
  },
  getReferrals() {
    return instance.get(`/user/referral-stats-history/`).then((response) => {
      return response;
    });
  },
  updateDeleteCard({ id }: idType) {
    return instance
      .get<createCardRT>(`/user/update-delete-card/${id}`)
      .then((response) => {
        return response;
      });
  },
  updateDeleteCardPut(props: createCardRT) {
    return instance
      .put<createCardRT>(`/user/update-delete-card/${props.id}`, props)
      .then((response) => {
        return response;
      });
  },
  updateDeleteCardPatch(props: createCardRT) {
    return instance
      .patch<createCardRT>(`/user/update-delete-card/${props.id}`, props)
      .then((response) => {
        return response;
      });
  },
  updateDeleteCardDelete({ id }: idType) {
    return instance
      .delete(`/user/update-delete-card/${id}`)
      .then((response) => {
        return response;
      });
  },
  updateDeleteUser() {
    return instance
      .get<createUserT>(`/user/update-delete-user/`)
      .then((response) => {
        return response;
      });
  },
  updateDeleteUserPut({ email, username, password }: createUserT) {
    return instance
      .put<createUserT>(`/user/update-delete-user/`, {
        email,
        username,
        password,
      })
      .then((response) => {
        return response;
      });
  },
  updateDeleteUserPatch({ email, username, password }: createUserT) {
    return instance
      .patch<createUserT>(`/user/update-delete-user/`, {
        email,
        username,
        password,
      })
      .then((response) => {
        return response;
      });
  },
  updateDeleteUserDelete() {
    return instance.delete(`/user/update-delete-user/`).then((response) => {
      return response;
    });
  },
  userGetCardList() {
    return instance
      .get<userGetCardListRT>(
        `
    ​/user​/user-cards-list​/`
      )
      .then((response) => {
        return response;
      });
  },
  userDonationRecieved() {
    return instance
      .get<userDonationRecievedRT>(
        `
    ​/user/user-donation-recieved/`
      )
      .then((response) => {
        return response;
      });
  },
  userDonationSended() {
    return instance
      .get<userDonationRecievedRT>(
        `
        /user/user-donation-sended/`
      )
      .then((response) => {
        return response;
      });
  },
  userGetPaymentHistory() {
    return instance
      .get<userGetPaymentHistoryRT>(
        `
        /user/user-payment-history/`
      )
      .then((response) => {
        return response;
      });
  },
  userGetReferralHistory() {
    return instance
      .get<referralHistory>(
        `
        /user/referral-stats-history/`
      )
      .then((response) => {
        return response;
      });
  },
  userGetSpendHistory() {
    return instance.get(`/user/spend-stats-history/`).then((response) => {
      return response;
    });
  },
  userGetEarnHistory() {
    return instance.get(`/user/pay-stats-history/`).then((response) => {
      return response;
    });
  },
  userSubscriptionUpdate({ id, email, username, password }: createUserT) {
    return instance
      .put<createUserT>(`/user/user-subscription/${id}`, {
        email,
        username,
        password,
      })
      .then((response) => {
        return response;
      });
  },
  userValidateUser(user: number, verified: boolean) {
    return instance
      .post<userValidateUserRT>(`/user/validate-user/`, { user, verified })
      .then((response) => {
        return response;
      });
  },
};
