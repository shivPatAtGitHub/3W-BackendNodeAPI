import authRoutes from "../Admin/Routes/authRoute.js";

const allAdminRoutes = (app) => {
  app.use("/admin", authRoutes);
};

export default allAdminRoutes;
