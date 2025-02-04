import ButtonGradient from "./assets/svg/ButtonGradient";
import { Summarizer, Analyser, Creator } from "./features";
import { Navbar, Brand, CTA } from "./components";
import { Header, Hero, Footer, WhatGPT4, Blog } from "./containers";

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <ButtonGradient />
      <Brand />
      <Analyser />
      <WhatGPT4 />
      <main>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="gradient__bg">
          <div className="ai__summarizer">
            <Hero />
            <Summarizer />
          </div>
        </div>
      </main>
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
};

export default App;
