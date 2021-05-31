import { Action, UserRequest } from "../../Model/StateModel";
import { UPDATE_USER_REQUEST } from "../actions/UserRequestAction"



const userRequestReducer = (state: Array<UserRequest> = [], action: Action) =>{
    switch(action.type){
        case UPDATE_USER_REQUEST:
            return copeUserRequest(action.payload as any, state);
        default:
            return state;
    }
}

const copeUserRequest = (requestList: Array<UserRequest>, prevState: Array<UserRequest>) => {
     const newList = [...prevState];
     for(let request of requestList){
         let requestId = request.id;
        for(let i = 0 ; i < newList.length; i++){
            let existingRequest = newList[i];
            let existingId = existingRequest.id;
            if(requestId === existingId){
                newList.splice(i, 1)
                break;
            }
        }
        newList.splice(0, 0, request);
     }
     return newList;
}
export default userRequestReducer;