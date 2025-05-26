import Room from "../models/room.js";
import { isAdminValid } from "./userControllers.js";

//create room
export function createRoom(req,res){
    if (!isAdminValid(req)) {
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const newRoom = new Room(req.body);

    newRoom.save().then(
        (result)=>{
            res.json(
                {
                    message:"Room Create Successfully",
                    result : result
                }
            )
        }
    ).catch(
        (err)=>
            res.json(
                {
                    message : "Room Creation failed ",
                    error : err
                }
            )
    )
}

//delete room
export function deleteRoom(req,res){
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.params.roomId

    Room.findOneAndDelete({roomId:roomId}).then(
        ()=>{
            res.json(
                {
                    message:"Room deletion Successfully"
                }
            )
        }
    ).cathch(
        ()=>{
            res.json(
                {
                    message:"Room deletion failed"
                }
            )
        }
    )
}

// find room

export function findRoomById(req,res){

    const roomId = req.params.roomId

    Room.findOne({roomId:roomId}).then(
        (result)=>{

            if(result==null){
                res.status(404).json(
                    {
                    message:"Room not found"
                }
            )
                return
            }else{
                res.json(
                    {
                        message:"Room Found",
                        result : result
                    }
                )
            }
        }
    ).catch(
        (err)=>{
            res.json(
                {
                    message:"Room serch failed",
                    error:err
                }
            )
        }
    )
}

// get rooms

export function getRooms(req,res){
    Room.find().then(
        (result)=>{
            res.json(
                {
                    rooms : result
                }
            )
        }
    ).catch(
        ()=>{
            res.json(
                {
                    message : "Failed to get rooms"
                }
            )
        }
    )
} 
//update room

export function updateRoom(req,res){
    
    if(!isAdminValid(req)){
        res.status(403).json({
            message : "Forbidden"
        })
        return
    }

    const roomId = req.params.roomId

    Room.findOneAndUpdate({
        roomId:roomId
    },req.body).then(
        ()=>{
            res.json(
            {
                message:"Room update successfully"
            }
        )
      }
    ).catch(
        ()=>{
            res.json(
                {
                    message:"room update failed"
                }
            )
        }
    )
}

export function getRoomByCategory(req,res) {
    const category = req.params.category;

    Room.find({ category:category }).then(
        (result) => {
            res.json(
                {
                
                rooms: result
                }
            )
        }
    ).catch(
        () => {
            res.json(
                {
                    message: "Failed to get rooms ",
                }
            )
        }
    )
}