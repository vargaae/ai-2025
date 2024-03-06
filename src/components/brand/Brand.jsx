import { google, clarifai, atlassian, openai, shopify } from "./imports";
import "./brand.css";

const Brand = () => (
  <div className="ai__brand section__padding">
    <div>
      <img src={google} />
    </div>
    <div>
      <img src={clarifai} />
    </div>
    <div>
      <img src={atlassian} />
    </div>
    <div>
      <img src={openai} />
    </div>
    <div>
      <img src={shopify} />
    </div>
    <div id="clarifai"></div>
  </div>
);

export default Brand;
