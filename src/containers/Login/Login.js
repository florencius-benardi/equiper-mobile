import React from 'react'
import { Row, Col } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { setUser } from '@/actions/user';
import { setAuthObject } from 'actions/authobject';
import Api from '@/helpers/api';
import './Login.css';
import '@/assets/styles/green.css';
import bgImage from '@/assets/img/background2.png'

const FormItem = Form.Item;
const api = new Api();

class NormalLoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: {},
            isLogin: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props
        let user = JSON.parse(localStorage.getItem('user'));

        dispatch(setUser(user));
        if (user) {
            this.setState({ isLogin: true })
            this.props.history.push('/app');
        }
    }

    handleSubmit = (e) => {
        const { email, password } = this.state
        const { dispatch } = this.props

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({ loading: true })

                api.login(email, password)
                    .then(response => {
                        this.setState({ loading: false })
                        // console.log(response.data);
                        if (response.status === 200) { //OK
                            try {
                                let user = response.data
                                let token = user.token
                                // Remove Token
                                delete user.token
                                dispatch(setUser(user));
                                localStorage.setItem('user', JSON.stringify(user));
                                localStorage.setItem('api_token', token);
                                //console.log('Token user adalah ...', token);
                                //console.log('Data user adalah ...',user);
                                window.location.reload();
                                //history.push('/dashboard')
                                // this.getAuthObject()
                            } catch (error) {
                                console.log(error)
                            }
                        }
                    })
                    .catch(error => {
                        this.setState({ loading: false })
                        // console.log(error);
                        if (error.response && error.response.data) {
                            const { data } = error.response
                            this.setState({ errors: data })
                        }
                    });

            }
        });
    }

    getAuthObject = () => {
        const { dispatch, history } = this.props

        //get data if not exist in redux 
        api.getAuthObjectList()
            .then(response => {
                // console.log(response.data);
                const { data } = response
                if (response.status === 200) { //OK
                    dispatch(setAuthObject(data))
                    history.push('/dashboard')
                }
            })
            .catch(error => {
                // console.log(error.response)
            })
    }

    inputPassworHandler = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { email, isLogin } = this.state;
        if (!isLogin)
            return (
                <div className="wrapper" style={{
                    backgroundImage: `url(${bgImage})`,
                    // backgroundSize:' cover',
                    backgroundPosition: '100% 20%',
                }}>
                    <div className="login-form-wrapper">
                        <Row>
                            <Col md={{ span: 9 }}>
                                <div className="login-form-container">

                                    <h1 className="text-head">Welcome</h1>
                                    {/* <p className="text-about">
                     is a very cool platform that combines multiple tools. <br/>
                    All of them are very cool and this is why:
                  </p>    */}

                                    {/* <p className="text-poin"><Icon type="check-circle" theme="filled" style={{color:'#1ea73c'}}/> You can do really cool stuff</p>
                  <p className="text-poin"><Icon type="check-circle" theme="filled" style={{color:'#1ea73c'}}/> And even more cool stuff</p>
                  <p className="text-poin"><Icon type="check-circle" theme="filled" style={{color:'#1ea73c'}}/> You won't believe it!</p> */}

                                    {this.state.errors.message ? <p style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>{this.state.errors.message}</p> : null}

                                    <Form onSubmit={this.handleSubmit} className="login-form">
                                        <FormItem>
                                            {getFieldDecorator('email', {
                                                rules: [{ required: true, message: 'Please input your username or email!' }],
                                                setFieldValue: email,
                                            })(
                                                <Input
                                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter your Username"
                                                    onChange={e => this.setState({ email: e.target.value })} />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: 'Please input your Password!' }],
                                                // setFieldValue: password,
                                            })(
                                                <Input.Password
                                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                    placeholder="Enter your Password"
                                                    onChange={(event) => this.inputPassworHandler(event)} />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(
                                                <Checkbox>Remember me</Checkbox>
                                            )}
                                            <Link className="login-form-forgot" to="/forgot-password">Forgot password</Link>
                                            <p></p>
                                            <Button type="primary" htmlType="submit" size="large" className="login-form-button" loading={this.state.loading}>
                                                LOGIN INTO YOUR ACCOUNT <Icon type="arrow-right" />
                                            </Button>
                                            {/* Or <a href="">register now!</a> */}
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            );
        else
            return null
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(WrappedNormalLoginForm);