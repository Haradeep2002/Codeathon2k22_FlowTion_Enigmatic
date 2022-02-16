import { isAuthenticated } from "../auth";
import { useState } from "react";
import { authenticate } from "../auth";
import { signin } from "../auth";
import { Redirect } from "react-router-dom";
import Menu from '../core/Menu'
import classes from './Signup.module.css'
const Signin = () => {
    const [values, setValues] = useState({
        email: 'test@gmail.com',
        password: '$Test123',
        error: '',
        loading: false,
        redirectToReferrer: false
    });
    const { email, password, error, loading, redirectToReferrer } = values;
    const { user } = isAuthenticated()
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    // console.log(data.error.message)
                    if (typeof data.error.message !== 'undefined')
                        setValues({ ...values, error: data.error.message, loading: false })
                    else
                        setValues({ ...values, error: 'Validation failed', success: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true
                        });
                    })
                }
            });
    };
    const signInForm = () => (
        <form>

            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }}>Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
            </div>

            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }}>Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className={classes.btn}>
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-info">
            <h2>Loading...</h2>
        </div>)
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            //console.log(user & user.role===1)
            if (user && user.role === 1) {
                return <Redirect to="/" />;
            } else {
                return <Redirect to="/" />;
            }
        }
    }

    return (<div style={{

        backgroundColor: 'rgba(5, 0, 255, 0.4)',

    }}><Menu >  </Menu>
        <div style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(5, 0, 255, 0.4)',
            display: 'flex',
            flexWrap: 'wrap'
        }}>


            <img style={{
                marginTop: '10%', marginLeft: '15%', marginRight: '12%', borderRadius: '290px'
            }} height="200px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Mvq2MGMEzWXPTUfqbqgtlUazwyoOYpB7lA&usqp=CAU"></img>

            <div className={classes.rform}>
                {showLoading()}
                {showError()}
                <div style={{ color: '#131D5A', paddingBottom: '20px' }}>            <h1 >Signin !</h1>
                </div>
                {signInForm()}
                {redirectUser()}
            </div>
        </div>
    </div >
    )
}

export default Signin;