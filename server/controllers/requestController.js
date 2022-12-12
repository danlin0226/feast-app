const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile"));

const sendRequest = (req, res) => {
  if (!req.body.prompt1 || !req.body.prompt2 || !req.body.prompt3) {
    return res
      .status(400)
      .send("Please provide responses for all three prompts!");
  }

  const newRequestId = uuidv4();

  console.log({ ...req.body, id: newRequestId, user_id: req.user.uid });

  knex("requests")
    .insert({ ...req.body, id: newRequestId, user_id: req.user.uid })
    .then(() => {
      knex("requests")
        .where({ id: newRequestId })
        .then((data) => {
          res.status(201).json(data[0]);
        });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getRequests = (req, res) => {
  knex("requests")
    .select("requests.*", "users.avatar AS user_avatar")
    .join("users", "requests.user_id", "users.id")
    .where({ "requests.listing_id": req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { sendRequest, getRequests };