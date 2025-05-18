import GalleryItem from "../models/galleryitem.js"

export function createGallertItems(req, res){

    const user =req.body.user
    if (user == null){
        res.status(403).json({
            message:"please login to create a gallery items"
        })
        return
    }
    if (user.type !="admin"){
        res.status(403).json({
            message:"you are not autherized to create a gallery Item"
        })
        return
    }
    // }if(user?.type != "admin"){
    //     res.status(403).json({
    //         message:"you do not have permission to create a gallery item"
    //     })
    //     return
    // }

    const galleryItem = req.body.item

    const newGalleryItem = new GalleryItem(galleryItem)

    newGalleryItem.save().then(
        ()=>{
            res.json({
                message:"Gallery item create successfully"
            })
           }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(500).json({
                message:"gallery item creation failed"
            })
        }
    )
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

