import Login from '../../views/auth/Login';
import ForgetPassword from '../../views/auth/ForgotPassword';
import ResetPassword from '../../views/auth/ResetPassword';


export default[
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path:'/forget_password',
        name: 'ForgetPassword',
        component: ForgetPassword
    },
    {
        path:'/reset_password/:token',
        name: 'ResetPassword',
        component: ResetPassword
    }
]