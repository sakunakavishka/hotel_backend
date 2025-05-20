import GalleryItem from "../models/galleryitem.js"


export function createGalleryItems(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        });
        return;
    }

    if (req.user.type !== "admin") {
        res.status(403).json({
            message: "Forbidden"
        });
        return;
    }

    const newGalleryItem = new GalleryItem(req.body);

    newGalleryItem.save()
        .then(result => {
            res.json({
                message: "Gallery item created successfully",
                result: result
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                message: "Gallery item creation failed",
                error: err
            });
        });
}

export function getGalleryItem(req,res){
    GalleryItem.find().then(
        (list)=>{
            res.json({
               list:list 
            })
        }
    )
}

