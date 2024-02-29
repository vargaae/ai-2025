import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import "./navbar.css";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="ai__navbar">
      <div className="ai__navbar-links">
        <div className="ai__navbar-links_logo">
          <img src={logo} alt="logo" className="w-18 object-contain" />
        </div>
        <div className="ai__navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#clarifai">Image Analyzer</a>
          </p>
          <p>
            <a href="#wgpt4">What is GPT4?</a>
          </p>
          <p>
            <a href="#summarizer">GPT4 Summarizer</a>
          </p>
          <p>
            <a href="#features">Case Studies</a>
          </p>
          <p>
            <a href="#blog">Library</a>
          </p>
          <p>
            <a href="#openai">Open AI</a>
          </p>
        </div>
      </div>
      <div className="ai__navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className="ai__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="ai__navbar-menu_container scale-up-center">
            <div className="ai__navbar-menu_container-links">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#clarifai">Image Analyzer</a>
              </p>
              <p>
                <a href="#wgpt4">What is GPT4?</a>
              </p>
              <p>
                <a href="#summarizer">GPT4 Summarizer</a>
              </p>
              <p>
                <a href="#features">Case Studies</a>
              </p>
              <p>
                <a href="#blog">Library</a>
              </p>
              <p>
                <a href="#openai">Open AI</a>
              </p>
            </div>
            <div className="ai__navbar-menu_container-links-sign">
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
