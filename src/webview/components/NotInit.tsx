import { initMessage } from "../utils/postMessages";

const NotInit = () => {
  return (
    <section>
      <h3>Your Not init Dot Todo</h3>
      <button onClick={initMessage}>Init Dot TODO</button>
    </section>
  );
};

export default NotInit;
