import userRoute from "../User/Routes/userRoute.js";

const allUserRoutes = (app) => {
  app.use("/user", userRoute);
};

export default allUserRoutes;
