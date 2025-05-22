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
    export function getCategory(req,res){
        Category.find().then(
            (result)=>{
                res.json(
                    {
                        categories : result
                    }
                )
            }
        ).catch(
            ()=>{
                res.json(
                    {
                        message:"failed to get category"
                    }
                )
            }
        )
    }
    export function getCategoryByName(req,res){
        const name = req.params.name;
        Category.findOne({name:name}).then(
            (result)=>{
                if(result == null){
                    res.json(
                        {
                            message:"Category not found"
                        }
                    )
                }else{
                    res.json(
                        {
                            category : result
                        }
                    )
                }
            }
        ).catch(
            ()=>{
                res.json(
                    {
                        message : "Failed to get category"
                    }
                )
            }
        )
    }
    export function updateCategory(req,res){
        if(!isAdminValid(req)){
            res.status(403).json({
                message:"unauthorized"
            })
            return
        }

        const name=req.params.name;

        Category.updateOne({name : name},req.body).then(
            ()=>{
                res.json({
                    message:"Category Update Successfully"
                })
            }
        ).catch(
        ()=>{
            res.json({
                message:"Failed To Update Category"
                })
            }
        )
    }

    function isAdminValid(req){
        if(req.user==null){
            return false
        }
        if(req.user.type !="admin"){
            return false
        }
        return true;
    }