/* @flow */
import { withReducer } from 'recompose';
import React from 'react'; // eslint-disable-line no-unused-vars
import { fetchQuestions } from '../src/request.js';
import type { Question } from '../src/shrTypes.js';
import { length } from 'ramda';
import { Rows } from '../src/views/questions.js';

// UPDATE
type ActionUpdateTitle =
  {| +type: 'ActionUpdateTitle',
     +title: string,
  |};

type ActionDoNothing =
  {| +type: 'ActionDoNothing',
  |};

type ActionUpdateControl =
  {| +type: 'ActionUpdateControl',
     +control: ControlState,
  |};

type ActionAddQuestions =
  {| +type: 'ActionAddQuestions',
     +questions: Array<Question>,
  |};

type Action =
  | ActionUpdateTitle
  | ActionDoNothing
  | ActionUpdateControl
  | ActionAddQuestions

const udpateTitle = (title: string): ActionUpdateTitle => { // eslint-disable-line no-unused-vars
  return {
    type: 'ActionUpdateTitle',
    title,
  };
};

const doNothing = (): ActionDoNothing => { // eslint-disable-line no-unused-vars
  return {
    type: 'ActionDoNothing',
  };
};

const udpateControl = (control: ControlState): ActionUpdateControl => { // eslint-disable-line no-unused-vars
  return {
    type: 'ActionUpdateControl',
    control,
  };
};

const addQuestions = (questions: Array<Question>): ActionAddQuestions => { // eslint-disable-line no-unused-vars
  return {
    type: 'ActionAddQuestions',
    questions,
  };
};

const reducer = (state: Model, action: Action): Model => {
  console.log(state, action); // eslint-disable-line
  action = controller(state.controlState, action);
  console.log(state, action); // eslint-disable-line
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
  case 'ActionUpdateTitle': {
    return {...state, title: action.title};
  }

  case 'ActionDoNothing': {
    return state;
  }

  case 'ActionUpdateControl': {
    return {...state, controlState: action.control};
  }

  case 'ActionAddQuestions': {
    return {...state, questions: action.questions};
  }

  // trick to have flow errors when we do not handle all the action types
  default:
    (action: empty);
    return state;
  }
};


type Model =
  {| +title: string
  ,  +controlState: ControlState
  ,  +questions: Array<Question>
  |}


type ControlState =
  {| +isLoaded: boolean
  |}


const controller = (controlState: ControlState, action: Action): Action => {
  if (typeof controlState === 'undefined') {
    return doNothing();
  }
  if (controlState.isLoaded) {
    return action;
  }

  return doNothing(); // TODO emit message invalid state please reload the page
};


// VIEWS

const ShowTitle = ({title}) => <h1>{title}</h1>; // eslint-disable-line
const ChangeTitle = ({dispatch, control}) => // eslint-disable-line
  <button
    onClick={() => dispatch(udpateTitle('cani'))}
  >
    Change Title
  </button>;

// BOOTSTRAP
const intialControlState =
  { isLoaded: true
  };

const initialState: Model =
  { title: 'ciao'
  , controlState: intialControlState
  , questions: []
  };

const enhance = withReducer('store', 'dispatch', reducer, initialState);
export const App = enhance(({store, dispatch}) => { // eslint-disable-line no-unused-vars
  length(store.questions) === 0 
    ? getQuestions(dispatch, [54079154,54079179])
    : undefined;
  const example =
    <div class='bd-main'>
      {[ ShowTitle({title:'ciao'})
      ,  ChangeTitle({dispatch: dispatch})
      ]}
    </div>;
  const mainView = length(store.questions) !== 0
    ? <div class='bd-main'>{Rows({questions: store.questions})}</div>
    : example;
  return mainView;
  });

// CONTROL

const getQuestions = async (dispatch, ids: Array<number>) => {
  const qst = await fetchQuestions(ids);
  dispatch(addQuestions(qst));
};
