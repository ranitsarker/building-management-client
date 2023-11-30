import MenuItem from "./MenuItem";


const UserMenu = () => {
    return (
        <>
             <MenuItem
                label='User Profile'
                address='user-profile'
            />
              <MenuItem
                label='Announcements'
                address='announcements'
            />
            <MenuItem
                label='Home'
                address='/'
            />
        </>
    );
};

export default UserMenu;