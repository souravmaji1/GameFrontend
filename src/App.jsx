import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";
import useAuthStore from "./store/useAuthStore";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { webApp, user } = useTelegram();

  useEffect(() => {
    webApp.ready();
    useAuthStore.setState({ userData: user });
  }, [webApp, user]);

  return (
    <>

    <BrowserRouter>
        <Routes />
      </BrowserRouter>
   
    </>
  );
}

export default App;
