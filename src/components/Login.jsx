import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import mainSlice, { setCurrUser } from '../slices/mainSlice';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, fsDatabase } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),

});
export default function Login() {
    let dispatch = useDispatch(setCurrUser(mainSlice))
    let goTo = useNavigate()
    async function getDataFS(email) {
        let querySnapshot = await getDocs(collection(fsDatabase, "users"));
        querySnapshot.forEach((doc) => {
            let dataElement = doc.data()
            if(dataElement.profile.email===email){
              dispatch(setCurrUser(dataElement))
             goTo("messages")
            }  
        })

    }
    return (
        <div className='login-page'>
            <div className='login-card' >

            <Formik 
                initialValues={{
                    email: '',
                    password: '',
                    
                }}
                validationSchema={LoginSchema}
                onSubmit={
                    values => {
                        let email = values.email
                        let password =values.password
                        signInWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Signed in 
                            const user = userCredential.user;
                            const uid = user.uid
                            console.log(uid)
                            //getting data
                        })
                        .then(()=>{
                            getDataFS(email)
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.log(errorCode,errorMessage)
                        })
                    }
                }
                >
                {({ errors, touched }) => (
                    <Form>
                        <div>Enter Email</div>
                        <Field name="email" type="email"/>
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                        ) : null}
                        <div>Enter Password</div>
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                            ) : null}
                        <button className='login-btn' type='submit' >Login</button>

                    </Form>
                )}
            </Formik>
            <p>Account do not exist? <button onClick={()=>{
                goTo("sign-up")
            }} >Signup</button></p>
            </div>
        </div>
    )
}
