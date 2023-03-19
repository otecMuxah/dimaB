import React from 'react';
import UserPanelSideBar from "../components/UserPanelSideBar/indes";
import Wishlist from "../components/Wishlist";

const UserPanel = (props:any) => {
    const {activePage}=props


    const handlerShowPage=(activePage:any)=>{
        switch (activePage) {
            case 'wishlist':return <Wishlist></Wishlist>

            case '':

            default:return <Wishlist></Wishlist>

        }

    }
    return (
        <>
        <div className={'userPanel__wrapper'}>
            <>
            <UserPanelSideBar/>
            {handlerShowPage}
            </>
        </div>
        </>
    );
};

export default UserPanel;
