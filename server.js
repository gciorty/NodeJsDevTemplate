const app = express();

// if you have a config file named `.env` in root directory
// require("dotenv").config();

const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");
const rateLimit = require("express-rate-limit");

// you might want to enable CORS for local testing and if used as an API
// app.use(
//   cors({
//     origin: CLIENT_ORIGIN,
//   })
// );
app.use(compression());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ extended: true, limit: "10kb" }));

// if you have a react client in that directory
// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", function (req, res)
// {
//     res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

// enable request limiting from same sources to prevent brute force attacks, add it as a middleware function to a rote as seen below
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests from this IP",
});

app.use("/api/", apiLimiter);

// use apiLimiter middleware for a route
// app.use("/api/users/login", apiLimiter, (req, res) => { return res.status(200).json({ message: "success" }) })

// handle 404
app.use((req, res, next) => {
  res.status(404).json({ errors: "Page not found" });
});

// handle app errors globally, you can use `utils/httpError.js` so that errors can be handled elegantly,
// otherwise it will work with default JS Errors
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode ? err.statusCode : 500).json({
    errors: Array.isArray(err.message) ? err.message : [err.message],
    errorCode: err.errorCode ? err.errorCode : 0,
  });
});

// run app on PORT 5000 by default, unless you create `.env` file and define PORT variable to 
// something else then import it as shown at the top of file
app.listen(process.env.PORT || 5000, () =>
  console.log(`Listening on port ${process.env.PORT || 5000}`)
);
