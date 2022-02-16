import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signup, authenticate } from '../auth';
import classes from './Signup.module.css'
import Menu from '../core/Menu';
const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });
    const [retype, setRetype] = useState('')

    const { name, email, password, loading, error, redirectToReferrer } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handlePassword = name => event => {
        if (password === event.target.value) {
            setValues({ ...values, error: false });
            setRetype(event.target.value)
        }
        else {
            setValues({ ...values, error: 'Passwords dont match' });
            setRetype(event.target.value)
        }
    };

    const clickSubmit = event => {
        event.preventDefault();
        if (!error) {
            setValues({ ...values, error: false, loading: true });
            signup({ name, email, password }).then(data => {
                //console.log(data)
                if (data.error) {
                    //console.log(data.error)
                    if (typeof data.error.message !== 'undefined')
                        setValues({ ...values, error: data.error.message, loading: false })
                    else
                        setValues({ ...values, error: 'Validation failed', success: false });
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            redirectToReferrer: true,

                        });
                    })
                }
            });
        }

    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }} >Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} style={{ marginBottom: '15px' }} />
            </div>

            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }} >Email</label>
                <input onChange={handleChange('email')} type="email" className="form-control" value={email} style={{ marginBottom: '15px' }} />
            </div>

            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }} >Password</label>
                <input onChange={handleChange('password')} type="password" className="form-control" value={password} style={{ marginBottom: '15px' }} />
            </div>

            <div className="form-group">
                <label style={{ fontWeight: 'bold', color: '#131D5A' }} >Retype Password</label>
                <input onChange={handlePassword()} type="password" className="form-control" value={retype} style={{ marginBottom: '15px' }} />
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
        loading && <div className="alert alert-info" >
            Loading...
        </div>
    );
    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />
        }
    }
    return (<div style={{ backgroundColor: 'rgba(5, 0, 255, 0.4)' }}><Menu>  </Menu>
        <div style={{
            width: '100%',
            height: '100%',
            // backgroundColor: 'rgba(5, 0, 255, 0.4)',
            display: 'flex',
            flexWrap: 'wrap'
        }}>

            <img style={{
                marginTop: '10%', marginLeft: '15%', marginRight: '12%', borderRadius: '290px'
            }} height="200px" src="https://eligeeducar.cl/content/uploads/2021/10/un-astronauto-viendo-un-documental.jpg"></img>

            < div className={classes.rform} >
                <div style={{ color: '#131D5A', paddingBottom: '20px' }}>            <h1 >Register!</h1>
                </div>

                {showLoading()}
                {showError()}
                {signUpForm()}
            </div>
            {redirectUser()}
        </div >
    </div>
    );
};

export default Signup;