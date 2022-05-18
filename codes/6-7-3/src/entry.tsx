import { render } from "react-dom";

const App: React.FC = () => (<div>hello world</div>);

const renderApp = () => {
  const container = document.querySelector("#custom_storefront");
  if (container == null) return;
  render(<App />, container);
};

renderApp();
