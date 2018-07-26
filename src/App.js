import React, { Component } from 'react';
import './App.css';
import {middleware, reducers} from "./store";
import {createStore,combineReducers,applyMiddleware} from "redux";
import {Provider} from "react-redux";
import TypeRacer from "./views/TypeRacer";



class App extends Component {

    constructor(props) {
      super(props);
      let initialState = {};
      this.store = createStore(
          combineReducers({
              ...reducers
          }),
          initialState,
          applyMiddleware(...middleware)
      );

  }

    render() {
        return (
            <Provider store={this.store}>
                <TypeRacer />
            </Provider>
        );
  }
}

export default App;
