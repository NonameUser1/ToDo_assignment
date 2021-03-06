import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import firebase from '../../firebase';

import './forms.scss';

class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            email:'' ,
            password:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e){
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(()=>{
                firebase.firestore().collection('users').add({
                    email:this.state.email,
                    password:this.state.password,
                    username: this.state.username
                });
            })
            .catch((error)=>{
                alert(`${error.message}  ${error.code}`);
            });
    }

    render() {
        return(
            <div className='authForm'>
                <form className='authForm__form' onSubmit={this.handleSubmit}>
                    <h5 className='authForm__title'>Sign Up</h5>
                    <input type='text'
                           id='username'
                           placeholder='Nickname'
                           className='authForm__input'
                           value={this.state.username}
                           onChange={this.handleInputChange}/>
                    <input type='email'
                           id='email'
                           placeholder='Email'
                           className='authForm__input'
                           value={this.state.email}
                           onChange={this.handleInputChange}/>
                    <input type='password'
                           id='password'
                           placeholder='Password'
                           className='authForm__input'
                           value={this.state.password}
                           onChange={this.handleInputChange}/>
                    <input type='submit' className='authForm__input--submit-btn' value='Sign up'/>
                    <Link className='authForm__link' to='/logIn'>Already have an account?</Link>
                </form>
            </div>
        );
    }

}

export default SignUpForm;