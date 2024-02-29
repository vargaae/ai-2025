import "./analysis.scss";
import { Component } from "react";
import ImageLinkForm from "./ImageLinkForm";
import ImageDetector from "./image-detector/ImageDetector";
import { images } from "./data";

// ! Clarifai API Call is changed - so the OLD version with Clarifai dependency is deprecated:
// const app = new Clarifai.App({
//   apiKey: '17b97a408b7949eea81ff850e5434b78'
//  });
// ! Clarifai API Call NEW version:
const returnClarifaiRequestOptions = (imageUrl) => {
  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the portal under Authentification
  const PAT = import.meta.env.VITE_CLARIFAI_API_KEY;
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = "vargaae";
  const APP_ID = "test-application-1589318146";
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = "general-image-recognition";
  const IMAGE_URL = imageUrl; ////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

const initialState = {
  input: "",
  imageUrl: "/",
  box: {},
  predictions: [],
  // !Change route from "home" to route: "signin", - if we need sign in form:
  // route: "signin",
  route: "home",
  isSignedIn: true,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class Analysis extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // !now this function work: onImageSubmit -> save to new file?!
  onImageSubmit = (imageUrl) => {
    console.log("hi");
    // eslint-disable-next-line no-restricted-globals
    this.setState({ input: event.target.value });
    this.setState({ imageUrl: this.state.input });

    fetch(
      "https://api.clarifai.com/v2/models/" +
        "general-image-recognition" +
        "/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("hi", response);
        this.setState(
          () => {
            return { predictions: response.outputs[0].data.concepts };
          },
          () => {
            console.log(this.state);
          }
        );
      })
      .catch((err) => console.log(err));
  };

  onClickThumb = (img) => {
    console.log("click to the thumb", this.state);
    this.setState({ input: img });
    this.setState({ imageUrl: img });
    console.log("STATEChange", this.state);
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { imageUrl, predictions } = this.state;

    return (
      <div className="gpt3__features section__padding" id="features">
        <div className="gpt3__features-container">
          {images.map((img) => (
            <div
              className="thumb-container"
              key={img.id}
              onClick={() => this.onClickThumb(`${img.img}`)}
            >
              <a target={img.img} rel="noreferrer">
                <div className="thumbnail">
                  <div className="thumbnail__container">
                    <div
                      className="thumbnail__img"
                      style={{
                        backgroundImage: `url(${img.img})`,
                      }}
                    >
                      <div className="thumbnail__content">
                        <h1 className="thumbnail__caption">{img.title}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="gpt3__features-heading">
          <h1 className="gradient__text">
            The Future is Now. Let's use AI for analysing.
          </h1>
          <ImageDetector
            onClickThumb={this.onClickThumb}
            predictions={predictions}
            imageUrl={imageUrl}
          />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onImageSubmit={this.onImageSubmit}
            imageUrl={imageUrl}
          />
        </div>

        <div className="gpt3__features-heading">
          <div className="i center">
            <div className="details">
              <div className="console">Clarifai API</div>
              <div id="customers">
                <div className="ai-analysis__table">
                  <div className="ai-analysis__table__leftcolumn">
                    PROBABILITY
                  </div>
                  <div className="ai-analysis__table__rightcolumn">
                    PREDICTED CONCEPT
                  </div>
                </div>
                <div className="ai-analysis__predictions-table">
                  {predictions?.length ? (
                    predictions
                      ?.filter((item) => item?.value > 0.91)
                      .map((item) => (
                        <div
                          className="ai-analysis__predictions-table-row"
                          key={item.id}
                        >
                          <div className="ai-analysis__table__leftcolumn">
                            <span>{">"} </span>
                            {Math.round(item.value * 100)}%
                          </div>
                          <div className="ai-analysis__table__rightcolumn">
                            {item.name}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="warning red" key={predictions?.length}>
                      Choose a Demo Image or Paste an URL of the image that you
                      want to analyse and then click the Analyse button
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="image-concepts">
              <a href={imageUrl} target="blank"></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analysis;