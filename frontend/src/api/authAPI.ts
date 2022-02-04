import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { instance, setAuthToken } from "./api";

export let token: number | null;
export const authAPI = {
  jwtCreate(email: string, password: string) {
    return instance
      .post<{ email: string; password: string }>("/auth/jwt/create/", {
        email,
        password,
      })
      .then((response) => {
        return response;
      });
  },
  jwtRefresh(refresh: string) {
    return instance
      .post("/auth/jwt/refresh/", {
        refresh,
      })
      .then((response) => {
        return response;
      });
  },
  jwtVerify() {
    return instance
      .post("/auth/jwt/verify/", {
        token,
      })
      .then((response) => {
        return response;
      });
  },
  login(email: string, password: string) {
    return instance
      .post("/user/login-user/", {
        email,
        password,
      })
      .then((response) => {
        console.log("here");
        if (response.status !== 200) {
          console.log("login error");
        }
        setAuthToken(response.data.auth_token);
        Cookies?.set("token", response.data.auth_token);
        return response.data.auth_token;
      })
  },
  logout() {
    return instance.post("/auth/token/logout/").then((response) => {
      if (response.status !== 204) {
        console.log("logout error");
      }
      return response;
    });
  },
  getUsers() {
    return instance.get("/auth/users/").then((response) => {
      return response.data;
    });
  },
  createUsers(
    username: string,
    email: string,
    password: string,
    ref_link: string
  ) {
    console.log({ username, email, password, ref_link });
    return instance
      .post("/user/create-user/", { username, email, password, ref_link })
      .then((response) => {
        setAuthToken(response.data.auth_token);
        return response.data;
      });
  },
  activateUsers(uid: string) {
    return instance
      .post("/auth/users/activation/", { uid, token })
      .then((response) => {
        return response.data;
      });
  },
  meGetLogin() {
    return instance
      .get<{ username: "string"; id: number; email: number }>("/auth/users/me/")
      .then((response) => {
        console.log("here");
        if (response.status === 200) {
          return response;
        }
      })
  },
  meGet() {
    return instance
      .get<{ username: "string"; id: number; email: number }>("/auth/users/me/")
      .then((response) => {
        console.log("here");
        if (response.status === 200) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
        const history = useHistory();
        history.push("/");
        // Cookies?.set("token", "");
        return error;
      });
  },
  meUpdate(data: any) {
    return instance.put("user/partial-update-user/", data).then((response) => {
      return response;
    });
  },
  mePatchUpdate(username: string) {
    return instance.patch("auth/users/me/", { username }).then((response) => {
      return response;
    });
  },
  meDelete() {
    return instance.delete("auth/users/me/").then((response) => {
      return response;
    });
  },
  resendActivation(email: string) {
    return instance
      .post("/auth/users/resend_activation/", { email })
      .then((response) => {
        return response;
      });
  },
  resetEmail(email: string) {
    return instance
      .post("/auth/users/reset_email/", { email })
      .then((response) => {
        return response;
      });
  },
  resetEmailConfirm({ new_email, uid }: { new_email: string; uid: number }) {
    return instance
      .post("/auth/users/reset_email_confirm/", { new_email, uid })
      .then((response) => {
        return response;
      });
  },
  resetPassword(email: string) {
    return instance
      .post("/auth/users/reset_password/", { email })
      .then((response) => {
        return response;
      });
  },
  resetPasswordConfirm(uid: string, new_password: string) {
    return instance
      .post("/auth/users/reset_password_confirm/", { token, uid, new_password })
      .then((response) => {
        return response;
      });
  },
  setEmail(new_email: string, current_email: string) {
    return instance
      .post("/auth/users/set_email/", {
        new_email,
        current_email,
      })
      .then((response) => {
        return response.data;
      });
  },
  setPassword(new_password: string, current_password: string) {
    return instance
      .post("auth/users/set_password/", {
        new_password,
        current_password,
      })
      .then((response) => {
        return response.data;
      });
  },
  getUser(id: string | number) {
    return instance.get(`/auth/users/${id}/`).then((response) => {
      return response.data;
    });
  },
  updateUser(id: string | number, username: string) {
    return instance.put(`/auth/users/${id}/`, { username }).then((response) => {
      return response.data;
    });
  },
  patchUpdateUser(id: string | number, username: string) {
    return instance
      .patch(`/auth/users/${id}/`, { username })
      .then((response) => {
        return response.data;
      });
  },
  deleteUser(id: string | number) {
    return instance.delete(`/auth/users/${id}/`).then((response) => {
      return response.data;
    });
  },
};

// getProfile() {
//   return instance.get('user/get-user/').then((response) => {
//     if (response.status !== 200) {
//       console.log('error');
//     }
//     return response.data;
//   });
// },
// deleteUser() {
//   return instance.delete(`user/update-delete-user/`).then((response) => {
//     if (response.status !== 204) {
//       console.log('Cant delete');
//     }
//     return response;
//   });
// },
// userValidate(userID: number, photo: any) {
//   return instance
//     .post('auth/users/validate_user/', {
//       user: userID,
//       photo: photo
//     })
//     .then((response) => {
//       return response.data;
//     });
// },
// userUpdate(email: string, username: string, data: any) {
//   const formData = new FormData();

//   for (const key in data) {
//     formData.append(key, data[key]);
//   }

//   formData.append('email', email);
//   formData.append('username', username);

//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data; '
//     }
//   };
//   console.log('FormData');
//   console.log(formData);
//   return instance.put(`user/partial-update-user/`, formData, config).then((response) => {
//     console.log(response);
//     if (response.status !== 200) {
//       console.log('Error!');
//     }
//     return response;
//   });
// },
// deleteCard(id: number) {
//   return instance.delete(`user/update-delete-card/${id}`).then((response) => {
//     if (response.status !== 204) {
//       console.log('Can not delete the card!');
//     }
//     return response;
//   });
// },
// createCard(number: string, date_year: string, cvc: string, creator: boolean, userID: number) {
//   return instance
//     .post('user/create-card/', {
//       number,
//       date_year,
//       cvc,
//       creator,
//       user: userID
//     })
//     .then((response) => {
//       if (response.status !== 201) {
//         console.log('Can not create a new card');
//       }
//       return response;
//     });
// },
// getCardsList() {
//   return instance.get('user/user-cards-list/').then((response) => {
//     if (response.status !== 200) {
//       console.log('Cant create a new card');
//     }
//     return response.data.results;
//   });
// },
// createPayment(amount: number, cardID: number) {
//   return instance
//     .post('user/create-payment/', {
//       amount,
//       card: cardID
//     })
//     .then((response) => {
//       if (response.status !== 201) {
//         console.log('Can not create a new payment');
//       }
//       return response;
//     });
// },
// getPayments() {
//   return instance.get('/user/user-payment-history/').then((response) => {
//     if (response.status !== 200) {
//       console.log(`Cann't get payments`);
//     }
//     return response.data.results;
//   });
// },
// createDonation(amount: number, sender: number, reciever: number) {
//   return instance.post(`user/create-donation/`, { amount, sender, reciever }).then((response) => {
//     if (response.status !== 201) {
//       console.log('Can not create a new payment');
//     }
//     return response;
//   });
// },
// getDonations(sended: boolean) {
//   const query = sended ? '/user/user-donation-sended/' : '/user/user-donation-recieved/';
//   return instance.get(query).then((response) => {
//     if (response.status !== 200) {
//       console.log('Can not get donations');
//     }
//     return response.data.results;
//   });
// }
