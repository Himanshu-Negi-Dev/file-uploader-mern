import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Post from  '../src/components/post/Post';
const App = () => {
   return (
      <>
         <Provider store={store}>
            <Post />
         </Provider>
      </>
   );
};

export default App;
