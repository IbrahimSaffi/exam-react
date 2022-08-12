import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import mainSlice, {setCurrUser } from '../slices/mainSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fsDatabase } from '../firebase-config';
import { addDataCustomIdFS } from '../firebase-functions';
import { collection, getDocs } from 'firebase/firestore';
import {useNavigate} from 'react-router-dom';


export default function Signup() {
    let goTo = useNavigate()
    let dispatch = useDispatch(mainSlice)
    let userAlreadyThere;
    async function getDataFS(email) {
        let querySnapshot = await getDocs(collection(fsDatabase, "users"));
        querySnapshot.forEach((doc) => {
            let dataElement = doc.data()
            if(dataElement.profile.email===email){
              dispatch(setCurrUser(dataElement))
              goTo("/messages")
            }  
        })
    }
    const SignupSchema = Yup.object().shape({
        userName: Yup.string()
            .min(3, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
        passwordCheck: Yup.string().test("password-match", "Passwords must match", function (value) {
            return this.parent.password === value
        }).required('Re-enter Password'),
    });
   async function userExist(userName){
    let querySnapshot = await getDocs(collection(fsDatabase, "users"));
    querySnapshot.forEach((doc) => {
        let dataElement = doc.data()
        if(dataElement.profile.userName===userName){
          userAlreadyThere =true
          console.log(userAlreadyThere)
        }  
    })
    userAlreadyThere = false
    }
    return (
        <div className='signup-page'>
            <div className='signup-card'>

            <Formik
            initialValues={{
                userName: '',
                email: '',
                password: '',
                passwordCheck: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={
                values => {
                    
                    //Creating user
                    let email = values.email
                    let password = values.password
                    //to verify user already exists or not
                    userExist(values.userName) 
                    .then(()=>{
                        // if(userAlreadyThere===false){
                            createUserWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                const uid = user.uid
                                //Adding user to database
                                addDataCustomIdFS(uid,values.userName,user.email)
                                //Will execute after data is succesfully added
                                
                            })
                            .then(() => {
                                     getDataFS(values.email)
                                    }
                                    )
                                    .catch((error) => {
                                        const errorCode = error.code;
                                        const errorMessage = error.message;
                                        console.log(errorCode, errorMessage)
                                    })
                                // }
                            })
                            
                        }
                    }
                    >
            {({ errors, touched }) => (
                <Form>
                    <div>Enter Username</div>
                    <Field name="userName" />
                    {errors.userName && touched.userName ? (
                        <div>{errors.userName}</div>
                        ) : null}
                    <div>Enter Email</div>
                    <Field name="email" type="email" />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <div>Enter Password</div>
                    <Field name="password" type="password" />
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                        ) : null}
                    <div>reenter Password</div>
                    <Field name="passwordCheck" type="password" />
                    {errors.passwordCheck && touched.passwordCheck ? (
                        <div>{errors.passwordCheck}</div>
                        ) : null}
                    <button className='signup-btn' type='submit' >Signup</button>
                </Form>
            )}
        </Formik></div>
            </div>
    )
}
