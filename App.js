// reducer
import { myStore, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

//
import MainApp from "./MainApp";

const App = () => {
  return (
    <Provider store={myStore}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

export default App;
