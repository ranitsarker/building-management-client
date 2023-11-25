import MenuItem from "./MenuItem";


const AdminMenu = () => {
    return (
        <>
             <MenuItem
                label='Admin Profile'
                address='admin-profile'
            />
            <MenuItem
                label='Manage Members'
                address='manage-members'
            />
            <MenuItem
                label='Make Announcement'
                address='make-announcement'
            />
            <MenuItem
                label='Agreement Requests'
                address='agreement-requests'
            />
            <MenuItem
                label='Manage Coupons'
                address='manage-coupons'
            />
        </>
    );
};

export default AdminMenu;