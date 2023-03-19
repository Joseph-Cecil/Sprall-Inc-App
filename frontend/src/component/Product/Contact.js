import React from 'react'
import "./Contact.css"
import emailjs from "emailjs-com";
import { init } from 'emailjs-com';
import MailOutlineIcon from '@material-ui/icons/MailOutline';





const Contact = () => {

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm("service_98azsrr","template_78hnbhl",e.target,init("8PIyEZqg6PmB3zJEX")).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));
    }
  return (
      <div className="contactContaniner">
    <div className="contactBox">
        <h2 className="contactHeading">Contact Form</h2>

        <form 
        className="contactForm" 
        onSubmit={sendEmail}
        >

        <div className='contactName'>
            <input 
            type="text" 
            placeholder='Full Name'
            name="name"/>
            </div>

        <div className='contactEmail'>
        <MailOutlineIcon />
            <input 
            type="email" 
            placeholder='Email'
            required
            name="user_email"
            />
            </div>

        <div className='contactMessage'>            
        <MailOutlineIcon />
            <input 
            type="message" 
            placeholder='Enter Your Message, we will respond to you as soon'
            required
            rows="5" 
            name='message'
            />

            </div>
            <input 
            type="submit" 
            value="Send"
            className='contactBtn'
            />
        </form>
        
    </div>
    </div>
  )
}

export default Contact