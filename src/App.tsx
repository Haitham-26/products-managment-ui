import { RouterProvider } from "react-router-dom";
import router from "./routes/router/Router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor} loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
