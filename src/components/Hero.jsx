import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-18 object-contain" />

        <button
          type="button"
          onClick={() =>
            window.open("https://github.com/vargaae/ai-2024", "_blank")
          }
          className="black_btn"
        >
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="blue_gradient ">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with ChatGPT, that transforms lengthy articles
        into clear and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
