import AppRoutes from "./routes/AppRoutes";
import {ToggleMenuProvider} from "./shop/ToggleMenuContext"
import "./App.css";

function App() {
  return (
    <ToggleMenuProvider>
      <AppRoutes />
      <div id="notifications"></div>
    </ToggleMenuProvider>
  );
}

export default App;
