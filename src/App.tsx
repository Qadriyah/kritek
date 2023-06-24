import { Provider } from "react-redux";
import "./App.css";
import store from "./redux/store/configureStore";
import Header from "./components/Header";
import Posts from "./routes/Posts";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <main>
          <Header />
          <Posts />
        </main>
      </div>
    </Provider>
  );
};

export default App;
