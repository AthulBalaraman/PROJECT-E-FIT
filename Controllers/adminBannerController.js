const bannerModel = require("../Model/adminBanner");

const showBannerPage = (req, res) => {
  bannerModel.showBanner().then((banners) => {
    res.render("admin/adminBannerPage", {
      admin: true,
      title: "BANNER CONTROL PAGE",
      banners,
    });
  });
};

const addBanner = (req, res) => {
  const { bannerName, bannerOffer } = req.body;
  console.log(req.file);
  bannerModel
    .inserBanner({ bannerImage: req.file.filename, bannerName, bannerOffer })
    .then((response) => {
      res.redirect("/admin/adminBannerPage");
    });
};

const deleteBanner = (req, res) => {
  let id = req.body.bannerId;
  console.log("bannererrrrrr", id);
  bannerModel.deleteBanner(id).then((response) => {
    res.json(response);
  });
};

module.exports = {
  showBannerPage,
  addBanner,
  deleteBanner,
};
