require("dotenv").config();

const validateHeader = (req, res, next) => {
    const api = req.header("api_key");
    const my_api_key = process.env.API_KEY;

    if (!api) {
        return res.status(400).send("missing api key");
    }

    if (api !== my_api_key) {
        return res.status(401).send("invalid api key");
    }

    next();
};

module.exports = validateHeader;
