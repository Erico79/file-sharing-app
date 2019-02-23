import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    Alert,
} from 'reactstrap';

import { handleLogin } from '../../store/modules/auth';

class Login extends Component {
    static propTypes = {
        isLoading: PropTypes.bool.isRequired,
        handleLogin: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
    }

    state = {
        email: '',
        password: '',
    }

    handleEmailChange = event => this.setState({ email: event.target.value });

    handlePasswordChange = event => this.setState({ password: event.target.value });

    handleLogin = async event => {
        event.preventDefault();
        this.props.handleLogin({
            email: this.state.email,
            password: this.state.password
        });
    }

    formatErrorMessage(messageCode) {
        switch(messageCode) {
            case 'INVALID_PASSWORD':
                return 'Your Email/Password is incorrect.';
            case 'EMAIL_NOT_FOUND':
                return 'The email doesn\'t exist.'
            case 'USER_DISABLED':
                return 'The user account has been disabled.';
            default:
                return messageCode;
        }
    }

    render() {
        const { email, password } = this.state;
        let { errorMessage } = this.props;
        errorMessage = this.formatErrorMessage(errorMessage);

        return (
            <div className="login-form">
                {errorMessage && <Alert color="danger">
                    {errorMessage}
                </Alert>}
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label for="email">Email Address</Label>
                        <Input type="email" id="email" onChange={this.handleEmailChange} value={email} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" id="password" onChange={this.handlePasswordChange} value={password} />
                    </FormGroup>
                    <Button disabled={this.props.isLoading}>Login</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
})

const mapDispatchToProps = dispatch => ({
    handleLogin: credentials => dispatch(handleLogin(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);