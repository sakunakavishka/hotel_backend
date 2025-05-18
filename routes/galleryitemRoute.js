import express from 'express'
import {createGallertItems,getGalleryItem} from "../controllers/galleryitemController.js"

const galleryItemRouter = express.Router();

galleryItemRouter.post("/",createGallertItems)
galleryItemRouter.get("/",getGalleryItem)

export default galleryItemRouter;