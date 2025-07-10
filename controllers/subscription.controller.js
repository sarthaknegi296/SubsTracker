import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import dotenv from "dotenv";
dotenv.config();
const SERVER_URL = process.env.SERVER_URL

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId }= await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id
      },
      headers: {
        'content-type': 'application/json'
      },
      retries: 0
    })

    res.status(201).json({
      success: true,
      data:{subscription, workflowRunId}
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionDetails = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);
    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubscriptionDetails = async (req, res, next) => {
  try {
    const {
      name,
      price,
      currency,
      frequency,
      category,
      paymentMethod,
      startDate,
    } = req.body;
    const subscriptionId = req.params.id;
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      { name, price, currency, frequency, category, paymentMethod, startDate },
      { new: true }
    );

    if (!updatedSubscription) {
      const error = new Error("Subscription Not Found");
      error.status = 401;
      throw error;
    }

    res.status(201).json({
      success: true,
      data: updatedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const deletedSubscription = await Subscription.findByIdAndDelete(
      subscriptionId
    );
    res.status(200).json({
      success: true,
      data: deletedSubscription,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const subscription = await Subscription.findById(subscriptionId);
    if(!subscription) {
      const error = new Error("Subscription Not found");
      error.status = 401;
      throw error;
    }
    subscription.status = "cancelled";
    await subscription.save();
    res.status(200).json({
      success: true,
      data: subscription,
    });
  }
  catch(error) {
    next(error);
  }
}
