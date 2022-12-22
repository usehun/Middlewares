import express from "express";

const app = express();
const date = new Date();

const urlLogger = (req, res, next) => {
  console.log(`Path: ${req.path} `);
  next();
};

const timeLogger = (req, res, next) => {
  console.log(
    `Time: ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  );
  next();
};

const securityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("secure");
  } else {
    console.log("insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  if (req.path === "/protected") {
    return res.redirect("http://localhost:4000/");
  }
  next();
};

app.use(urlLogger);
app.use(timeLogger);
app.use(securityLogger);
app.use(protectorMiddleware);

app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(process.env.PORT, () => `Listening!✅`);
