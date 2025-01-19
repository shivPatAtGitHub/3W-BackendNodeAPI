import All_Models from "./allModels.js";

const relations = (app) => {
  // User - Images
  All_Models.User_Model.hasMany(All_Models.Image_Model);
  All_Models.Image_Model.belongsTo(All_Models.User_Model);
};

export default relations;
