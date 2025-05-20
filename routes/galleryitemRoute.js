import express from 'express'
import {createGalleryItems,getGalleryItem} from "../controllers/galleryitemController.js"

const galleryItemRouter = express.Router();

galleryItemRouter.post("/",createGalleryItems)
galleryItemRouter.get("/",getGalleryItem)

export default galleryItemRouter;