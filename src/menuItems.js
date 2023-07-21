import { LOGIN_STATUS } from "./constants";

export const menuItems = [
    {
        id: 'home', label: 'Home'
    },
    {
        id: 'membersOnly', label: 'Members Only'
    },
    {
        id: 'account', label: 'Account'
    },
    {
        id: 'shoppingBag', label: 'Shopping Bag'
    },
    {
        id: 'login', label: 'Login'
    },
];

export function getFilteredMenuItems(loginStatus) {
    return menuItems.filter(item => {
        return loginStatus !== LOGIN_STATUS.IS_LOGGED_IN || item.label !== "Login";
    });
};