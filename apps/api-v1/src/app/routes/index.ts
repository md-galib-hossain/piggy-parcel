import { Router } from "express";
import consumerRoutes from "./consumer";
import adminRoutes from "./admin";

const router : Router = Router();

// Register Consumer Routes under /api/consumer
router.use("/consumer", consumerRoutes);

// Register Admin Routes under /api/admin
router.use("/admin", adminRoutes);

export default router;