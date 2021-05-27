var express = require("express");
var router = express.Router();
const coach_utils = require("./utils/coach_utils");

router.get("/:coachId", async (req, res, next) => {
  try {
    const coach_details = await coach_utils.getCoachDetailsById(req.params.coachId);
    res.send(coach_details);
  } catch (error) {
    next(error);
  }
});

router.get("/getPreview/:coachId", async (req, res, next) => {
  try {
    const coach_preview = await coach_utils.getCoachPreviewById(req.params.coachId);
    res.send(coach_preview);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
