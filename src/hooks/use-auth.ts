
import {useAppSelector} from "./redux-hooks";

export const useAuth=():{email:string|null,isAuth:boolean,token:null|string,id:null|number}=> {
    const {email,token,id}:{email:string|null,token:string|null,id:number|null}=useAppSelector(state=>state.user)
    return{
        isAuth:!!email,
        email,
        token,
        id,
    }
}