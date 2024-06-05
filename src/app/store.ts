import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";

import LayoutReducer from "../slices/layouts/reducer";
// Authentication
import ForgetPasswordReducer from "../slices/auth/forgetpwd/reducer";
import ProfileReducer from "../slices/auth/profile/reducer";
import DashboardReducer from "../slices/dashboard/reducer";
import { studentSlice } from "features/student/studentSlice";
import { programmSlice } from "features/programms/programmSlice";
import { accountSlice } from "features/account/accountSlice";
import authSlice from "features/account/authSlice";
import { contractSlice } from "features/contract/contractSlice";
import { quoteSlice } from "features/quotes/quotesSlice";
import { vehicleTypeSlice } from "features/vehicleType/vehicleType";
import { luggageSlice } from "features/luggage/luggage";
import { journeySlice } from "features/journey/journey";
import { complainSlice } from "features/complains/ComplainSlice";
import { noteSlice } from "features/notes/noteSlice";
import { groupSlice } from "features/group/groupSlice";
import { affiliateSlice } from "features/affiliate/affiliateSlice";
import authAffiliateSlice from "features/affiliate/authAffiliateSlice";
import { driverSlice } from "features/driver/driverSlice";
import { vehicleSlice } from "features/vehicles/vehicleSlice";
import { extraSlice } from "features/VehicleExtraLuxury/extraSlice";


export const store = configureStore({
  reducer: {
    [studentSlice.reducerPath]: studentSlice.reducer,
    [programmSlice.reducerPath]: programmSlice.reducer,
    [accountSlice.reducerPath]: accountSlice.reducer,
    [quoteSlice.reducerPath]: quoteSlice.reducer,
    [contractSlice.reducerPath]: contractSlice.reducer,
    [vehicleTypeSlice.reducerPath]: vehicleTypeSlice.reducer,
    [luggageSlice.reducerPath]: luggageSlice.reducer,
    [journeySlice.reducerPath]: journeySlice.reducer,
    [complainSlice.reducerPath]: complainSlice.reducer,
    [noteSlice.reducerPath]: noteSlice.reducer,
    [groupSlice.reducerPath]: groupSlice.reducer,
    [affiliateSlice.reducerPath]: affiliateSlice.reducer,
    [driverSlice.reducerPath]: driverSlice.reducer,
    [vehicleSlice.reducerPath]: vehicleSlice.reducer,
    [extraSlice.reducerPath]: extraSlice.reducer,
    auth: authSlice,
    authAffiliate: authAffiliateSlice,
    Layout: LayoutReducer,
    ForgetPassword: ForgetPasswordReducer,
    Profile: ProfileReducer,
    Dashboard: DashboardReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([
      studentSlice.middleware,
      programmSlice.middleware,
      accountSlice.middleware,
      contractSlice.middleware,
      quoteSlice.middleware,
      journeySlice.middleware,
      luggageSlice.middleware,
      vehicleTypeSlice.middleware,
      complainSlice.middleware,
      noteSlice.middleware,
      groupSlice.middleware,
      affiliateSlice.middleware,
      driverSlice.middleware,
      vehicleSlice.middleware,
      extraSlice.middleware,
    ]);
  },
});
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
