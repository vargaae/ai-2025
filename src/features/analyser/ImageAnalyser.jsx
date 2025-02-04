import "./analyser.scss";

import { Component } from "react";
import { images } from "./data";

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

class Analyser extends Component {
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

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // BACKEND CALL -> I put back to my server because of the CORS
  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch("https://ai-2025-api.vercel.app/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://ai-2025-api.vercel.app/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch((err) => console.log);
        }
        this.displayConcepts(this.displayPredictions(response));
        // this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  onClickThumb = (img) => {
    this.setState({ input: img });
    this.setState({ imageUrl: img });
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
      <div className="ai__features section__padding">
        <div className="ai__features-container">
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
        <div className="ai__features-heading">
          <h1 className="gradient__text">
            The Future is Now. Let&#39;s use AI for analysing.
          </h1>
          <img
            id="inputimage"
            className="p-img"
            alt={imageUrl}
            src={
              imageUrl === "/"
                ? "https://www.surveycto.com/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnN1cnZleWN0by5jb20lMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYxMSUyRmRhdGEtY29sbGVjdGlvbi10b29sc19maW5hbF9oZWFkZXIucG5nJmNhY2hlTWFya2VyPTE3MDA1OTY1MTEtNDk2NTI0JnRva2VuPTdmOTNkOGYzNDU5ZDQ2YjY.q.png"
                : imageUrl
            }
            style={{ height: 300, width: "auto", padding: 10 }}
          />

          <div>
      <p className="f3">
        {
          "Choose a demo image or Paste your image's URL here and it will analysis the picture with an AI model:"
        }
      </p>
      <p> https://www.clarifai.com/hs-fs/hubfs/50_72.png?width=2880&height=1600&name=50_72.png</p>
      <div className="ai__header-content__input">
      <button onClick={imageUrl === "/" ? null : this.onImageSubmit} className="action_btn">Analyse</button>
        <input
          type="text"
          onChange={this.onInputChange}
          placeholder="Paste the URL of an image"
        />
      </div>
    </div>
    </div>

          <div className="ai__features-heading">
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
            <div id="wgpt4">
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Analyser;
