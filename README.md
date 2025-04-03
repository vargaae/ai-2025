 <div align="center">
  <img alt="Application image" src="https://cssh.northeastern.edu/informationethics/wp-content/uploads/sites/44/2020/07/ai@2x.png" width="400" />
</div>
<br>
  <div align="center">
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Redux-black?style=for-the-badge&logoColor=white&logo=redux&color=764ABC" alt="redux" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

# AI Analyser 2025 APPLICATION

🚀Client Side of the Full Stack AI Analyser (and Generator) 2025 Application:

- AI Text Analyser - ChatGPT - GPT 4 (through RapidAPI)
- AI Detection - Image Analyser - clarifai 2.9.1
- AI News
- AI Image Generator - Dall-E (in the code, but hidden from live demo)

## 🛠 Front End:

- React 18.2
- REDUX Toolkit
- SASS
- Tailwind CSS
- AWS-amplify
## AI 2025 ClientSide Application - Screenshots

<div align="center">
  <img alt="Application image" src="https://vargaae.hu/images/projects/ai-2024.png" width="700" />
</div>

## AI Detection Image Analysis

<p align="center">
AI detection image analysis | AI visual inspection tool
application with Clarifai API.
This application analyses the loaded image and makes predictions of concepts, that we can use for example for keywords. I designed and developed the React application for this AI detection tool. It's connected to the server side through the Routes - REST API and through the encrypted auth services.
</p>
<div align="center">
<img alt="OpenAI logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-ywmdBsy_LQo5vULnankQxbOiEfl_sT-CIEKCpUoizQ&s" width="150" />
<img alt="ClarifAI logo" src="https://www.clarifai.com/hs-fs/hubfs/logo/Clarifai/clarifai-740x150.png?width=120&name=clarifai-740x150.png" width="150" />
<img alt="Rapid API logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/RapidAPI_logo.svg/1200px-RapidAPI_logo.svg.png" width="150" />
</div>

## 🛠 AI IMAGE DETECTION IMAGE ANALYSIS Back End:

<p align="center">NodeJS express server 🚀 / FastAPI server🚀 

## 🛠 Server Side Repository

- Now it's connected: [NodeJS express server version](https://github.com/vargaae/ai-expressapi-2025)
- [FastAPI server version](https://github.com/vargaae/imagedetect-fastapi-2025/)

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

1. Clone this repo
2. Run `npm install`
3. You must add your own API key in the `src/App.js` file to connect to Clarifai, Rapid API, Open AI.

You can grab ClarifAI API key [here](https://www.clarifai.com/)
You can grab RapidAPI key [here](https://rapidapi.com/)
You can grab OpenAI API key [here](https://openai.com/)

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
VITE_CLARIFAI_API_KEY=
VITE_RAPID_API_ARTICLE_KEY=
VITE_OPENAI_API_KEY=
```

1. **Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
