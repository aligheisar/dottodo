import Providers from "./context/Providers";
import App from "./App";

const Root = () => {
  return (
    <Providers>
      <App />
    </Providers>
  );
};

export default Root;
