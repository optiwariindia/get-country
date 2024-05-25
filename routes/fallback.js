import express from "express";
const router = express.Router();
router.use(async (req, res, next) => {
    return res.status(401).json({
        error: "Unauthorized"
    })
})
export default router;