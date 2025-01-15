import React, { useState, useRef } from "react";

const Enquiry = (props) => {

    const { setLoad } = props;

    const resRef = useRef();
    const nameRef = useRef();
    const telRef = useRef();
    const emailRef = useRef();
    const textRef = useRef();
  
    const [name, setName] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
  
    const handleSubmit = async (event) => {
  
      event.preventDefault();
      
      let error = false;
  
      if (!/^[ '.a-z-]{2,40}$/i.test(name)) {
  
        error = true;
        nameRef.current.innerHTML = "Enter your name";
        event.target.name.classList.add("error");
      } else {
  
        nameRef.current.innerHTML = "";
        event.target.name.classList.remove("error");
      };
  
      if (!/^\+?\d{3,15}$/.test(tel)) {
  
        error = true;
        telRef.current.innerHTML = "+###############";
        event.target.tel.classList.add("error");
      } else {
  
        telRef.current.innerHTML = "";
        event.target.tel.classList.remove("error");
      };
  
      if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/.test(email)) {
  
        error = true;
        emailRef.current.innerHTML = "Enter your email";
        event.target.email.classList.add("error");
      } else {
  
        emailRef.current.innerHTML = "";
        event.target.email.classList.remove("error");
      };
  
      if (!/[\dA-Za-z]/.test(text)) {
  
        error = true;
        textRef.current.innerHTML = "Enter your message";
        event.target.text.classList.add("error");
      } else {
  
        textRef.current.innerHTML = "";
        event.target.text.classList.remove("error");
      };
  
      if (error) return;
  
      const form_data = new FormData();
  
      form_data.append("name", name);
      form_data.append("tel", tel);
      form_data.append("email", email);
      form_data.append("text", text);
  
      const token = localStorage.getItem("token");
  
      let res = await fetch(`/api/?controller=enquiry&token=${token}`, { 
        
        method: "POST", 
        body: form_data,
      });
  
      if (!res.ok) { 
        
        let err = await res.text();
        setLoad(err);
        return;
      };
  
      let json = await res.json();
  
      if (json.key === btoa(process.env.REACT_APP_KEY)) {
  
        resRef.current.innerHTML = json.message;
  
        setTimeout(() => {
          
          resRef.current.innerHTML = "";
          setName("");
          setTel("");
          setEmail("");
          setText("");
        }, 6000);
      };
    };
  
  return (
    
    <div className="container-xl g-0">

      <div className="container-xxl row justify-content-center pb-5 mb-5 pt-4 px-xxl-4 g-0">

        <div className="col-11 col-lg-10 col-xl-12">

          <hr className="mb-5"/>

          <form className="enquiry" onSubmit={handleSubmit}>

            <fieldset>

                <div className="row justify-content-between g-0">

                  <div className="col-12">

                      <legend className="mb-4">
                        
                        Enquiry
                        
                        <b ref={resRef} className="ms-4"></b>
                        
                      </legend>

                      <p className="m-0">
                        
                        Required fields are marked *
                        
                      </p>

                  </div>

                  <div className="col-12 col-sm-6">

                      <label className="pe-sm-3">
                      
                        <span className="hidden d-block">
                          
                          Name
                          
                        </span>

                        <span ref={nameRef}></span>

                        <input

                            className="ps-2"
                            type="text"
                            name="name" 
                            value={name}
                            placeholder="* Name"
                            autoComplete=""
                            onChange={(event) => setName(event.target.value)}
                            
                        />

                      </label>

                  </div>

                  <div className="col-12 col-sm-6">

                      <label className="ps-sm-3">
                      
                        <span className="hidden d-block">
                          
                          Phone
                          
                        </span>

                        <span ref={telRef}></span>

                        <input

                            className="ps-2"
                            type="text"
                            name="tel" 
                            value={tel}
                            placeholder="* Phone"
                            autoComplete=""
                            onChange={(event) => setTel(event.target.value)}

                        />

                      </label>

                  </div>

                  <div className="col-12 col-sm-6">

                      <label className="pe-sm-3">
                        
                        <span className="hidden d-block">
                          
                          Email
                          
                        </span>

                        <span ref={emailRef}></span>

                        <input

                            className="ps-2"
                            type="text"
                            name="email" 
                            value={email}
                            placeholder="* Email"
                            autoComplete=""
                            onChange={(event) => setEmail(event.target.value)}

                        />

                      </label>

                  </div>

                  <div className="col-12">

                      <label htmlFor="text">
                        
                        <span className="hidden d-block">

                          Message
                          
                        </span>

                        <span ref={textRef}></span>

                        <textarea

                            id="text"
                            className="ps-2"
                            name="text" 
                            value={text}
                            placeholder="* Message"
                            onChange={(event) => setText(event.target.value)}
                            rows="6"

                        >
                        </textarea>

                      </label>

                  </div>

                </div>

            </fieldset>

            <div className="row g-0">

              <div className="col-12 col-sm-9 pt-4">

                <div className="row justify-content-between align-items-center g-0">

                    <div className="col-12 col-sm-8">

                      <p className="mb-5 m-sm-0">

                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                          sed do eiusmod tempor incididunt.

                      </p>

                    </div>

                    <div className="col-12 col-sm-4 d-flex justify-content-sm-end">

                      <input className="rounded" type="submit" value="Send" />

                    </div>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );
};

export default Enquiry;