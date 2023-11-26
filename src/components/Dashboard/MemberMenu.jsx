import MenuItem from "./MenuItem";


const MemberMenu = () => {
    return (
        <>
             <MenuItem
                label='Member Profile'
                address='member-profile'
            />
             <MenuItem
                label='Announcements'
                address='announcements'
            />
        </>
    );
};

export default MemberMenu;