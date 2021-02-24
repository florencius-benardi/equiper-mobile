import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Grid, IconButton, Input, InputAdornment, InputLabel, Link, Paper, Typography, withStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { connect } from 'react-redux';
import * as actions from '@Actions'
import { updateObject, checkValidity } from '@hoc/Shared/utility';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        '& label.Mui-focused': {
            color: '#045F2E',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#045F2E',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#045F2E',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#045F2E',
            },
        },
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        color: 'black',
        backgroundColor: theme.palette.common.white,
        '&:hover': {
            backgroundColor: '#FDFDFD',
            borderColor: '#045F2E',
            boxShadow: 'none',
            color: '#045F2E',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#FDFDFD',
            borderColor: '#045F2E',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    border: {
        borderBlockColor: 'black'
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));

const BootstrapButton = withStyles({
    root: {
        boxShadow: '5px',
        textTransform: 'none',
        fontSize: 12,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#045F2E',
        borderColor: '#FDFDFD',
        color: '#FDFDFD',
        '&:hover': {
            backgroundColor: '#FDFDFD',
            borderColor: '#045F2E',
            boxShadow: 'none',
            color: '#045F2E',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#FDFDFD',
            borderColor: '#045F2E',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);


const Login = (props) => {

    const [loginForm, setLoginForm] = useState({
        username: {
            type: 'text',
            label: 'Username or Email',
            placeholder: 'Username / Email',
            valueText: '',
            valid: false,
            validation: {
                required: true,
                isEmail: true
            },
            autocomplete: 'username',
        },
        password: {
            type: 'password',
            label: 'Password',
            placeholder: 'Password',
            valueText: '',
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
            autocomplete: 'password',
            showText: false,
        },

    });

    const { authRedirectPath, onSetAuthRedirectPath } = props;

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changeHandler = (event, controlName) => {
        const updateControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                valueText: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    loginForm[controlName].validation
                ),
                touched: true
            })
        })
        setLoginForm(updateControls);
    };

    const showPasswordHandler = (controlName) => {
        const updateControls = updateObject(loginForm, {
            [controlName]: updateObject(loginForm[controlName], {
                showText: !loginForm[controlName].showText
            })
        })
        setLoginForm(updateControls);
    };

    const submitHandler = event => {
        event.preventDefault();
        props.onAuth(loginForm.username.value, loginForm.password.value);
    };


    useEffect(() => {
        if (authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [authRedirectPath, onSetAuthRedirectPath]);

    const formElementsArray = [];

    for (let key in loginForm) {
        formElementsArray.push({
            id: key,
            config: loginForm[key]
        });
    }

    let inputForm = formElementsArray.map(formElement => (
        <Fragment>
            <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-password">{formElement.config.label}</InputLabel>
                <Input
                    id={formElement.id}
                    type={
                        formElement.id === 'password' && formElement.config.showText ?
                            'text' :
                            formElement.id === 'password' && !formElement.config.showText ?
                                'password' : 'text'
                    }
                    name={formElement.id}
                    placeholder={formElement.config.placeholder}
                    value={formElement.config.valueText}
                    autoComplete={formElement.config.autocomplete}
                    onChange={event => changeHandler(event, formElement.id)}
                    endAdornment={formElement.config.type === 'password' ?
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="show password"
                                onClick={event => showPasswordHandler(formElement.id)}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {formElement.config.showText ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment> : null
                    }
                    required
                />
            </FormControl>
            <br />
            <br />
        </Fragment>
    ));

    const formStyles = useStyles();

    return (
        <Grid container component='main' className={formStyles.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={4} component={Paper} elevation={12} square>
                <div className={formStyles.paper}>
                    <Avatar className={formStyles.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={formStyles.form} noValidate onSubmit={submitHandler}>
                        {inputForm}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="default" />}
                            label="Remember me"
                        />
                        <BootstrapButton
                            type="submit"
                            fullWidth
                            variant="outlined"
                            size="medium"
                            color="secondary"
                            className={formStyles.submit}
                        >
                            Sign In
                        </BootstrapButton >
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="inherit">
                                    Forgot password?
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            {/* <Copyright /> */}
                        </Box>
                    </form>
                </div>
            </Grid>
            <Grid item xs={false} sm={4} md={8} className={formStyles.image} />
        </Grid >
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) =>
            dispatch(actions.auth(username, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);