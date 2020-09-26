const app = express();
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");

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

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("*", function (req, res)
// {
//     res.sendFile(path.join(__dirname, "/client/build", "index.html"));
// });

app.use((req, res, next) =>
{
    res.status(404).json({ errors: "Page not found" });
});

app.use((err, req, res, next) =>
{
    console.log(err);
    res.status(err.statusCode ? err.statusCode : 500).json({
        errors: Array.isArray(err.message) ? err.message : [err.message],
        errorCode: err.errorCode ? err.errorCode : 0,
    });
});

app.listen(process.env.PORT || 5000, () =>
    console.log(`Listening on port ${process.env.PORT || 5000}`)
);
