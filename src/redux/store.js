import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
// import { authReducer } from "./auth/auth.reducer";
import { applicationFromReducer } from "./ApplicationForm/applicationForm.reducer";
const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  applicationForm: applicationFromReducer,
});

export const store = createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);
