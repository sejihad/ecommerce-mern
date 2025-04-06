import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // LocalStorage use korar jonno
import { thunk } from "redux-thunk"; // ✅ Named import
import { cartReducer } from "./reducers/cartReducer.jsx";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer.jsx";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from "./reducers/productReducer.jsx";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer.jsx";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // ✅ Only persist user reducer
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  order: orderReducer,
  allOrders: allOrdersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  product: productReducer,
  newProduct: newProductReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

// Middleware setup
const middleware = [thunk];

// Create store with persisted reducer
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// Persistor
export const persistor = persistStore(store);

export default store;
