import { Summarizer, Analyser } from "./features";
import { Navbar, Brand, CTA } from "./components";
import { Header, Hero, Footer, Features, WhatGPT4, Blog } from "./containers";
// import {
//   Possibility,
//   Creator,
// } from "./containers";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <Brand />
      <Analyser />
      <WhatGPT4 />
      <Features />
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
