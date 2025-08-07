const express = require("express");
const Url = require("../model/urlSchema");
const { restrictTo } = require("../middleware/verifyUser");
const staticRouter = express.Router();

staticRouter.get("/admin/url", restrictTo(["ADMIN"]), async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("home", {
    urls: allUrls,
    user: req.user.name,
  });
});
staticRouter.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  const allUrls = await Url.find({ createBy: req.user.id }).populate(
    "createBy",
    "name email"
  );
  console.log("all urls", allUrls);
  return res.render("home", {
    urls: allUrls,
    user: req.user.name,
  });
});

staticRouter.get("/signup", async (req, res) => {
  return res.render("signup");
});
staticRouter.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = staticRouter;
