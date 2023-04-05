import User from "../../views/admin/user/User.vue";
import AddUser from "../../views/admin/user/AddUser.vue";
import EditUser from "../../views/admin/user/EditUser.vue";

export default [
    {
        path: 'users',
        name: 'users',
        component: User
    },

    {
        path: 'add_user',
        name: 'AddUser',
        component: AddUser
    },

    {
        path: 'edit_user/:id',
        name: 'EditUser',
        component: EditUser
    }
]