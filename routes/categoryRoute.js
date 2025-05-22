import express from "express";
import {createCategory, deleteCategory,getCategory, getCategoryByName, updateCategory} from "../controllers/categoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/",createCategory)

categoryRouter.delete("/:name",deleteCategory)

categoryRouter.get("/:name",getCategoryByName)

categoryRouter.get("/",getCategory)

categoryRouter.put("/:name",updateCategory)

// categoryRouter.get("/serchByPrice",(req,res)=>{
//     res.json({
//         message : "serchByPrice"
//     })
// })

export default categoryRouter;