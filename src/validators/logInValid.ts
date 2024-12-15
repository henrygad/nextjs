import * as yup from 'yup';

const logInValid = yup.object().shape({
    userNameOrEmail: yup.string().lowercase().required('This field is required'),
    passWord: yup.string().required('Password is required'),
});

export default logInValid;