import { Slot } from "expo-router";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store/index";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
}
