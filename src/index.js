import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import rootReducer from "./store/modules";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";

import createHistory from "history/createBrowserHistory";

// 리덕스 개발자도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

const customHistory = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={customHistory}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
