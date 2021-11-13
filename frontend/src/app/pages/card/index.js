import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from '~/api/userAPI';
import Card from './components/card';
import CForm from './components/form';

const initialState = {
  cardNumber: '#### #### #### ####',
  cardHolder: 'ПОЛНОЕ ИМЯ',
  cardMonth: '',
  cardYear: '',
  cardCvv: '',
  isCardFlipped: false
};

export const CardComponent = () => {
  const [state, setState] = useState(initialState);
  const [currentFocusedElm, setCurrentFocusedElm] = useState(null);

  const userID = useSelector((state) => state.auth.pk);

  const createCard = async () => {
    const data = await userAPI.createCard({
      name: state.cardHolder,
      number: state.cardNumber.split(' ').join(''),
      date_year: `${state.cardMonth}/${state.cardYear}`,
      cvc: state.cardCvv,
      creator: true,
      user: userID
    });
    console.log(data);
  };

  const updateStateValues = useCallback(
    (keyName, value) => {
      setState({
        ...state,
        [keyName]: value || initialState[keyName]
      });
    },
    [state]
  );

  // References for the Form Inputs used to focus corresponding inputs.
  let formFieldsRefObj = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef(),
    cardCvv: useRef()
  };

  let focusFormFieldByKey = useCallback((key) => {
    formFieldsRefObj[key].current.focus();
  });

  // This are the references for the Card DIV elements.
  let cardElementsRef = {
    cardNumber: useRef(),
    cardHolder: useRef(),
    cardDate: useRef()
  };

  let onCardFormInputFocus = (_event, inputName) => {
    const refByName = cardElementsRef[inputName];
    setCurrentFocusedElm(refByName);
  };

  let onCardInputBlur = useCallback(() => {
    setCurrentFocusedElm(null);
  }, []);

  return (
    <div className="notifications__main">
      {' '}
      <div className="card_wrapper">
        <CForm
          cardMonth={state.cardMonth}
          cardYear={state.cardYear}
          onUpdateState={updateStateValues}
          cardNumberRef={formFieldsRefObj.cardNumber}
          cardHolderRef={formFieldsRefObj.cardHolder}
          cardDateRef={formFieldsRefObj.cardDate}
          onCardInputFocus={onCardFormInputFocus}
          onCardInputBlur={onCardInputBlur}
          isCardFlipped={state.isCardFlipped}
        >
          <Card
            cardNumber={state.cardNumber}
            cardHolder={state.cardHolder}
            cardMonth={state.cardMonth}
            cardYear={state.cardYear}
            cardCvv={state.cardCvv}
            isCardFlipped={state.isCardFlipped}
            currentFocusedElm={currentFocusedElm}
            onCardElementClick={focusFormFieldByKey}
            cardNumberRef={cardElementsRef.cardNumber}
            cardHolderRef={cardElementsRef.cardHolder}
            cardDateRef={cardElementsRef.cardDate}
          ></Card>
        </CForm>
        <button className="notifications__settingBtn" onClick={() => createCard()}>
          Сохранить
        </button>
      </div>
    </div>
  );
};
