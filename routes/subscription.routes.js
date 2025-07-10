import  { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getSubscriptionDetails, getUserSubscription, updateSubscriptionDetails } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get("/:id", authorize, getSubscriptionDetails);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscriptionDetails);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscription);

subscriptionRouter.put("/:id/cancel", authorize, cancelSubscription);


export default subscriptionRouter;