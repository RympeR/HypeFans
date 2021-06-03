import Profile from './ApiProfile';
import photoFile1 from './test.jpg';
import { CardCreation, UserGet } from './types';

function toDataURL(url: any, callback: any) {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

const TestProfileApi = () => {
  const profile = new Profile();
  // const userData = {
  //   login: 'test000002',
  //   email: 'test000002@test.com',
  //   password: 'qweasd'
  // };
  const userData = {
    login: 'test000003',
    email: 'test000003@test.com',
    password: 'qweasd'
  };

  const cardData: CardCreation = {
    creator: true,
    cvc: '123',
    date_year: '0123',
    number: '1324123412341234',
    id: 0,
    user: 0
  };

  const login = () => {
    console.log('Login');

    profile
      .login(userData.email, userData.password)
      .then((result) => {
        console.log(result);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FALED');
      });
  };

  const logout = () => {
    console.log('Logout');
    // const profile = new Profile();
    profile
      .logout()
      .then((result) => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FALED');
      });
  };

  const deleteUser = () => {
    console.log('deleteUser');
    profile
      .deleteUser()
      .then((result) => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FALED');
      });
  };

  const register = () => {
    console.log('register');
    // const profile = new Profile();
    profile
      .register(userData.email, userData.login, userData.password)
      .then((result) => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getProfile = () => {
    console.log('getProfile');
    // const profile = new Profile();
    profile
      .getProfile()
      .then((result) => {
        console.log(result);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const updateUser = () => {
    console.log('updateUser');
    // const profile = new Profile();
    profile
      .updateUser(userData.password, { first_name: 'Вася' })
      .then((result) => {
        console.log('SUCCESS');
        getProfile();
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const createCard = () => {
    console.log('createCard');
    profile
      .createCard(cardData.number, cardData.date_year, cardData.cvc, cardData.creator)
      .then((result) => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getCardsList = () => {
    console.log('getCardsList');
    profile
      .getCardsList()
      .then(() => {
        console.log(profile.cards);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const deleteCard = () => {
    console.log('deleteCard');
    profile
      .deleteCard(profile.cards[0])
      .then((result) => {
        console.log(profile.payments);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const createPayment = () => {
    console.log('createPayment');
    profile
      .createPayment(12321, profile.cards[0])
      .then(() => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getPayments = () => {
    console.log('getPayment');
    profile
      .getPayments()
      .then((result) => {
        console.log(profile.payments);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const createDonation = () => {
    console.log('createDonation');
    const testUser = new UserGet();
    testUser.pk = 13;
    profile
      .createDonation(9876543, testUser)
      .then((result) => {
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getDonationSended = () => {
    console.log('getDonationSended');
    profile
      .getDonationSended()
      .then((result) => {
        console.log(profile.donationsSended);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getDonationRecieved = () => {
    console.log('getDonationRecieved');
    profile
      .getDonationReceived()
      .then((result) => {
        console.log(profile.donationsRecieved);
        console.log('SUCCESS');
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };
  const validate = () => {
    console.log('validate');
    const testUser = new UserGet();
    testUser.pk = 13;
    toDataURL(photoFile1, (dataUrl: any) => {
      profile
        .validate(testUser, dataUrl)
        .then((result) => {
          console.log(result);
          console.log('SUCCESS');
        })
        .catch((error) => {
          console.error(error);
          console.error('FAILED');
        });
      console.log('RESULT:', dataUrl);
    });
  };

  return (
    <>
      <h1>User</h1>
      <div>
        <button onClick={login}>login</button>
        <button onClick={logout}>logout</button>
        <button onClick={register}>register</button>
        <button onClick={getProfile}>getProfile</button>
        <button onClick={updateUser}>updateUser</button>
        <button onClick={deleteUser}>deleteUser</button>
        <button onClick={validate}>validate</button>
      </div>
      <h1>Card and payments</h1>
      <div>
        <button onClick={createCard}>createCard</button>
        <button onClick={getCardsList}>getСardsList</button>
        <button onClick={deleteCard}>deleteCard</button>
        <div>
          <h2>Payment</h2>
          <button onClick={createPayment}>createPayment</button>
          <button onClick={getPayments}>getPayments</button>
        </div>
        <div>
          <h2>Donation</h2>
          <button onClick={createDonation}>createDonation</button>
          <button onClick={getDonationSended}>getDonationSended</button>
          <button onClick={getDonationRecieved}>getDonationReceived</button>
        </div>
      </div>
    </>
  );
};

export default TestProfileApi;
