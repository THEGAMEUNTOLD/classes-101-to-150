import express from "express";
const App = express();

App.use(express.static("public"));

export default App;