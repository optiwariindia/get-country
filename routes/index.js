import fallbackRouter from "./fallback.js";
import countryRouter from "./api.country.js";
import express from "express";
const router =express.Router();
router.use("/api/v1/country",countryRouter);
router.use(fallbackRouter);
export default router;