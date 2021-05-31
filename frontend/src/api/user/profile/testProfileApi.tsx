import Profile from './profile';

const TestProfileApi = () => {
  const profile = new Profile();

  const login = () => {
    console.log('Login');
    // const profile = new Profile();
    // profile.login('tesdfsdfsst@test.com', 'passwordsdfsdf').then((result) => {
    //   console.log(result);
    //   console.log('SUCCESS');
    // });
    profile.login('root@gmail.com', 'root').then((result) => {
      console.log(result);
      console.log('SUCCESS');
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

  const register = () => {
    console.log('register');
    // const profile = new Profile();
    profile
      .register('tesdfsdfsst111@test.com', 'usersdfsdf111', 'passwordsdfsdf111')
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
      .updateUser('root', { first_name: 'Вася' })
      .then((result) => {
        console.log('SUCCESS');
        getProfile();
      })
      .catch((error) => {
        console.error(error);
        console.error('FAILED');
      });
  };

  const getDonation = () => {
    console.log('getDonation');
  };
  const createCard = () => {
    console.log('createCard');
  };
  const getPayment = () => {
    console.log('getPayment');
  };
  const createPayment = () => {
    console.log('createPayment');
  };
  const deleteCard = () => {
    console.log('deleteCard');
  };

  const validate = () => {
    console.log('validate');
  };

  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={logout}>logout</button>
      <button onClick={register}>register</button>
      <button onClick={getProfile}>getProfile</button>
      {/* <button onClick={deleteUser}>deleteUser</button> */}
      <button onClick={createCard}>createCard</button>
      <button onClick={createPayment}>createPayment</button>
      <button onClick={getDonation}>getDonation</button>
      <button onClick={getPayment}>getPayment</button>
      <button onClick={deleteCard}>deleteCard</button>
      <button onClick={updateUser}>updateUser</button>
      <button onClick={validate}>validate</button>
    </>
  );
};

export default TestProfileApi;
