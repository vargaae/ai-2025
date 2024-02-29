import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";

const Header = () => (
  <div className="ai__header section__padding" id="home">
    <div className="ai__header-content">
      <h1 className="gradient__text">
        Let&apos;s Create Something amazing using AI models
      </h1>
      <p>
      Clarifai API is a powerful tool for general image recognition, offering a computer vision platform that enables developers to integrate image and video analysis into their applications. It utilizes deep learning algorithms to automatically tag, categorize, and understand the content of images. Developers can leverage Clarifai's pre-trained models for common objects, concepts, and scenes, or train custom models for specific recognition tasks. The API is versatile, making it suitable for a wide range of applications, from content moderation and visual search to building personalized user experiences.
      </p>

      <div className="ai__header-content__input">
        <input type="text" placeholder="Analyse an image, and check out the predictions" />
        <a href="#clarifai">
          <button type="button">Get Started</button>
        </a>
      </div>

      <div className="ai__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="ai__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
