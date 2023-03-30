import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch,RootState} from "../store/store";

export const useAppDispatch=()=>useDispatch<AppDispatch>();
//обычный useDispatch, но сразу типизированный
//это избавит меня от необходимости делать это в каждом файле, я буду использовать UseAppDispatch

export  const useAppSelector:TypedUseSelectorHook<RootState>=useSelector
//Использую некий типизированный UseSelectorHook и передаю туда, мой RootState