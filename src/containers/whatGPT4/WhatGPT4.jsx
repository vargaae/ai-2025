import Feature from "../../components/feature/Feature";
import "./whatGPT4.css";

const WhatGPT4 = () => (
  <div className="ai__whatgpt4 section__margin">
    <div className="ai__whatgpt4-feature">
      <Feature
        title="What is GPT-4"
        text="GPT-4 is a powerful AI language model that understands and generates human-like text, assisting with content creation, problem-solving, and more."
      />
    </div>
    <div className="ai__whatgpt4-heading">
      <h1 className="gradient__text">
        The possibilities are beyond your imagination
      </h1>
      <p>
        <a href="#blog">Explore the Library</a>
      </p>
    </div>
    <div className="ai__whatgpt4-container">
      <Feature
        title="Chatbots"
        text="Enhance customer support and engagement with AI-driven chatbots that provide instant, intelligent responses 24/7."
      />
      <Feature
        title="Knowledgebase"
        text="Organize and access information efficiently with an AI-powered knowledgebase, making it easier to find answers and streamline workflows."
      />
      <Feature
        id="summarizer"
        title="Education"
        text="Transform learning with AI—personalized tutoring, content generation, and enhanced student engagement for a smarter education system."
      />
    </div>
    <div id="summarizer"></div>
  </div>
);

export default WhatGPT4;
