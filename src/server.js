import express from "express";

const app = express();

const date = new Date();

const URLLogger = (req, res, next) => {
  console.log("Path: ", req.path);
  next();
};

const TimeLogger = (req, res, next) => {
  console.log(
    `Time: ${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
  );
  next();
};

const SecurityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("secure");
    next();
  }
  console.log("insecure");
  next();
};

const ProtectorMiddleware = (req, res, next) => {
  if (req.path === "/protected") {
    return res.send(`<h1>Not Allow</h1>`);
  }
  next();
};

app.use(URLLogger, TimeLogger, SecurityLogger, ProtectorMiddleware);

app.get("/", (req, res) => res.send("<h1>Home</h1>"));
app.get("/protected", (req, res) => res.send("<h1>Protected</h1>"));

// Codesandbox gives us a PORT :)
app.listen(process.env.PORT, () => `Listening!✅`);
