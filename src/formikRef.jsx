import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, "Password should be atleast 6 letter long").required('Password is required'),
  passwordCheck: Yup.string().test("password-match", "Passwords must match", function (value) {
    return this.parent.password === value
  }).required('Re-enter Password'),
  dateOfBirth :Yup.string()
  .required('Required') 
  ,
  country: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  city: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});

//Element
<Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordCheck: '',
          dateOfBirth: '',
          country: '',
          city: '',

        }}
        validationSchema={SignupSchema}
        onSubmit={
          values => "Do something with values"
        }
      >
        {({ errors, touched }) => (
          <Form>
            <div>Enter First Name</div>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <div>Enter last Name</div>
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <div>Enter Email</div>
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <div>Enter Date of Birth</div>
            <Field name="dateOfBirth" type="date" />
            {errors.dateOfBirth && touched.dateOfBirth ? <div>{errors.dateOfBirth}</div> : null}
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
            
            <div>Enter Country</div>
            <Field name="country" />
            {errors.country && touched.country ? (
              <div>{errors.country}</div>
            ) : null}
            <div>Enter City</div>
            <Field name="city" />
            {errors.city && touched.city ? (
              <div>{errors.city}</div>
            ) : null}
            <button type='submit' >Signup</button>
          </Form>
        )}
      </Formik>