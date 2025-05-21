import Category from "../models/category.js";

export function createCategory(req,res){

    if (req.user==null){
        res.status(401).json({
            message:"unauthorized"
        })
        return;
    }
    if (req.user.type !="admin"){
        res.status(401).json({
            message:"forbidden"
        })
        return;
    }

    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result)=>{
            res.json(
                {
                    message:"Category Created Successfully",
                    result:result
                }
            )
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message:"Category creation failed",
                    error: err
                }
            )
        }
    )
}
export function deleteCategory(req,res){
    if (req.user==null){
        res.status(401).json({
            message:"unauthorized"
        })
        return
        }
        if (req.user.type !=="admin"){
            res.status(403).json({
                message:"forbidden"
            })
            return
        }
        const name =req.params.name
        Category.findOneAndDelete({name:name}).then(
            ()=>{
                res.json(
                    {
                    message:"Category delete successfully"
                    }
                 )
             }
        ).catch(
            ()=>{
                res.json(
                    {
                        message:"Category deletion failed"
                    }
                )
            }
        )
    }