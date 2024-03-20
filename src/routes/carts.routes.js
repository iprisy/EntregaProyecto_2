const { Router } = require("express");

const handlePolicies = require("../middleware/handle-policies.middleware");
const cartModel = require("../models/carts.model");
const userModel = require("../models/user.model");

const router = Router();

router.get("/", handlePolicies(["PUBLIC"]), async (req, res) => {
  try {
  } catch (error) {}
});

router.get("/:cartId", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  try {
    const cartData = await cartModel.findById({ _id: req.params.cartId });

    return res.json({ message: `getcartById`, cart: cartData });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:17 ~ router.get ~ error:", error);
  }
});

router.post("/", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  try {
    const bodycarts = req.body;
    const newcart = await cartModel.create(bodycarts);
    const {
      user: { id },
    } = req.user;
    console.log(
      "🚀 ~ file: carts.routes.js:24 ~ router.post ~ req.user:",
      req.user
    );

    const userData = await userModel.findById({ _id: id });

    userData.carts.push({ cart: newcart._id });
    const updatedcarts = await userModel.updateOne({ _id: id }, userData);

    if (!updatedcarts.acknowledged) {
      return res.status(500).json({
        message: `cart has been created but can not be related`,
      });
    }

    return res.json({
      message: `cart has been created and related successfuly`,
      cart: newcart,
      relatated: updatedcarts,
    });
  } catch (error) {
    console.log("🚀 ~ file: carts.routes.js:46 ~ router.post ~ error:", error);
  }
});

router.delete("/:cartId", handlePolicies(["ADMIN"]), async (req, res) => {
  try {

    const deletecart = await cartModel.deleteOne({ _id: req.params.cartId });


    return res.json({
      message: `deletecartById`,
      cart: deletecart,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: carts.routes.js:28 ~ router.delete ~ error:",
      error
    );
  }
});

module.exports = router;