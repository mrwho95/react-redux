//if ES6
//import redux from 'redux'

//simple node js app
const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware; //Middleware extends redux with custom functionality, use middleware for logging, crash reporting, performing asynchronous tasks
const logger = reduxLogger.createLogger(); //logging

// ACTION
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// action creator
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "First redux action",
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    info: "Second redux action",
  };
}

//reducer = (previous state, action) => newState
// const initialState={
//   numOfCakes: 10,
//   numOfIceCream: 20,
// }

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCream: 20,
};

const cakeReducer = (state = initialCakeState, action) => {
  //return new state based on current state and the action
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state, //asking reducer to first make copy of the state object, and then update number of cakes, other properties remain unchanged.
        numOfCakes: state.numOfCakes - 1,
      };

    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  //return new state based on current state and the action
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };

    default:
      return state;
  }
};

//redux store
//Hold application state
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger)); //second parameter apply redux logger to log data
console.log("initial state", store.getState()); //access to state via getState()
const unsubcribe = store.subscribe(() => {}); //register listeners via subcribe(listener)
store.dispatch(buyCake()); //allow state to be updated dispatch(action)
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
//handle unregistering of listeners via the function returned by subscribe(listener)
unsubcribe();
