import RouteList from "./routes/RouteList";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <div className="mainDiv">
      <section id="header">
        <Header setSearch={setSearch} />
      </section>
      <div className="subDiv">
        <RouteList search={search} />
      </div>
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export default App;
