import { Client as WorkflowClient } from "@upstash/workflow";
import dotenv from "dotenv";
dotenv.config();

const QSTASH_TOKEN = process.env.QSTASH_TOKEN;
const QSTASH_URL = process.env.QSTASH_URL;

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL,
    token: QSTASH_TOKEN
});