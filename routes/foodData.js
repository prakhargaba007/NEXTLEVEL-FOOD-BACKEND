const express = require("express");
const { body } = require("express-validator");

const feedController = require("../controllers/dataController");

const router = express.Router();

router.get("/", feedController.getdata);

router.post(
  "/share",
  [
    body("title").trim().isLength({ min: 5 }),
    body("slug").trim().isLength({ min: 5 }),
    body("instructions").trim().isLength({ min: 10 }),
    body("creator").trim().isLength({ min: 5 }),
    body("creator_email")
      .isEmail()
      .withMessage("Plese enter a valid email")
      .normalizeEmail(),
  ],
  feedController.createPost
);

router.get("/getPost/:postId", feedController.getPost);

module.exports = router;
