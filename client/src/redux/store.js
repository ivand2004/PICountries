import thunk from "redux-thunk";
import rootReducer from "./reducer";
const { createStore, applyMiddleware } = require("redux");


const store = createStore(rootReducer, applyMiddleware(thunk));
export default store