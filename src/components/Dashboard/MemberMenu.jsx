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
            <MenuItem
                label='Make Payment'
                address='make-payment'
            />
            <MenuItem
                label='Payment History'
                address='payment-history'
            />
        </>
    );
};

export default MemberMenu;