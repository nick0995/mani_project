// import React, { useEffect, useRef } from 'react';
// import { Modal } from 'bootstrap'; // Import Modal from Bootstrap

// const LoginModal = ({ show, onClose, onLoginSuccess }) => {
//   const modalRef = useRef(null);
//   const signInBtnRef = useRef(null);
//   const signUpBtnRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     let bsModal;
//     if (modalRef.current) {
//       bsModal = new Modal(modalRef.current, {
//         backdrop: 'static', // Prevent closing by clicking outside
//         keyboard: false // Prevent closing with escape key
//       });

//       if (show) {
//         bsModal.show();
//       } else {
//         bsModal.hide();
//       }

//       // Clean up modal instance on component unmount
//       return () => {
//         if (bsModal) {
//           bsModal.dispose();
//         }
//       };
//     }
//   }, [show]);

//   useEffect(() => {
//     const signInButton = signInBtnRef.current;
//     const signUpButton = signUpBtnRef.current;
//     const container = containerRef.current;

//     const handleSignInClick = () => {
//       container.classList.remove('right-panel-active');
//     };

//     const handleSignUpClick = () => {
//       container.classList.add('right-panel-active');
//     };

//     if (signInButton && signUpButton && container) {
//       signInButton.addEventListener('click', handleSignInClick);
//       signUpButton.addEventListener('click', handleSignUpClick);
//     }

//     return () => {
//       if (signInButton && signUpButton && container) {
//         signInButton.removeEventListener('click', handleSignInClick);
//         signUpButton.removeEventListener('click', handleSignUpClick);
//       }
//     };
//   }, []);

//     const handleLoginFormSubmit = (e) => {
//     e.preventDefault();
//     const usernameInput = e.target.elements.username.value;

//     if (usernameInput) {
//       // Call parent handler
//       onLoginSuccess(usernameInput);

//       // Hide the modal manually
//       const modalEl = modalRef.current;
//       if (modalEl) {
//         const modalInstance = Modal.getInstance(modalEl); // Get Bootstrap instance
//         if (modalInstance) modalInstance.hide();
//       }
//     }
//   };

//   return (
//     <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" ref={modalRef}>
//       <div className="modal-dialog modal-xl modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-body">
//             <div className="login_container">
//               <div className="custom_container" id="My_container" ref={containerRef}>
//                 {/* Sign Up */}
//                 <div className="form-container sign-up-container">
//                   <form>
//                     <h1>For Sign Up</h1>
//                     <input type="text" placeholder="Name" />
//                     <input type="text" placeholder="Rank" />
//                     <input type="number" placeholder="Belt Number" />
//                     <input type="number" placeholder="Mobile Number" />
//                     <input type="email" placeholder="Email" />
//                     <button type="submit">Submit</button>
//                   </form>
//                 </div>

//                 {/* Sign In */}
//                 <div className="form-container sign-in-container">
//                   <form id="loginForm" onSubmit={handleLoginFormSubmit}>
//                     <h1>Sign In</h1>
//                     <input type="text" id="username" name="username" placeholder="Username" required />
//                     <input type="password" id="password" name="password" placeholder="  Password" required />
//                     <div className="admin_checkbox">
//                       <input style={{ width: '30px' }} type="checkbox" id="admin_login" name="adminlogin" />
//                       <label htmlFor="admin_login" className="blinking-bold">Only If You Are Admin</label>
//                     </div>
//                     <button type="submit">Sign In</button>
//                   </form>
//                 </div>

//                 {/* Overlay */}
//                 <div className="overlay-container">
//                   <div className="overlay">
//                     <div className="overlay-panel overlay-left">
//                       <h1>Welcome Back!</h1>
//                       <p>If you already have an account, sign in here</p>
//                       <button className="ghost" id="signIn" ref={signInBtnRef}>Sign In</button>
//                     </div>
//                     <div className="overlay-panel overlay-right">
//                       <h1>Hello, Officer!</h1>
//                       <p>Enter your details for contact us and start your journey</p>
//                       <button className="ghost" id="signUp" ref={signUpBtnRef}>For Sign Up</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
// import React, { useEffect, useRef, useState } from 'react';
// import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';


// const LoginModal = ({ show, onClose, onLoginSuccess }) => {
//   const signInBtnRef = useRef(null);
//   const signUpBtnRef = useRef(null);
//   const containerRef = useRef(null);
//   const navigate = useNavigate();

//   const handleClose = () => {
//     onClose?.(); // trigger prop close
//     navigate(-1); // go back to the previous page
    
//   };
//   const [rightPanelActive, setRightPanelActive] = useState(false);

//   useEffect(() => {
//     const container = containerRef.current;

//     if (!container) return;

//     const handleSignInClick = () => setRightPanelActive(false);
//     const handleSignUpClick = () => setRightPanelActive(true);

//     const signInButton = signInBtnRef.current;
//     const signUpButton = signUpBtnRef.current;

//     if (signInButton) signInButton.addEventListener('click', handleSignInClick);
//     if (signUpButton) signUpButton.addEventListener('click', handleSignUpClick);

//     return () => {
//       if (signInButton) signInButton.removeEventListener('click', handleSignInClick);
//       if (signUpButton) signUpButton.removeEventListener('click', handleSignUpClick);
//     };
//   }, []);

//   const handleLoginFormSubmit = (e) => {
//     e.preventDefault();
//     const username = e.target.elements.username.value;
//     if (username) {
//       onLoginSuccess(username);
//       onClose(); // Close modal
//     }
//   };

//   return (
//    <Modal
//       show={show}
//       onHide={handleClose}
//       size="xl"
//       centered
//       backdrop={true}
//       keyboard={true}
//     >
//       <Modal.Body>
//         <div className="login_container">
//           <div
//             className={`custom_container ${rightPanelActive ? 'right-panel-active' : ''}`}
//             id="My_container"
//             ref={containerRef}
//           >
//             {/* Sign Up */}
//             <div className="form-container sign-up-container">
//               <Form>
//                 <h1>For Sign Up</h1>
//                 <Form.Control type="text" placeholder="Name" className="mb-2" />
//                 <Form.Control type="text" placeholder="Rank" className="mb-2" />
//                 <Form.Control type="number" placeholder="Belt Number" className="mb-2" />
//                 <Form.Control type="number" placeholder="Mobile Number" className="mb-2" />
//                 <Form.Control type="email" placeholder="Email" className="mb-2" />
//                 <Button type="submit">Submit</Button>
//               </Form>
//             </div>

//             {/* Sign In */}
//             <div className="form-container sign-in-container">
//               <Form onSubmit={handleLoginFormSubmit}>
//                 <h1>Sign In</h1>
//                 <Form.Control name="username" type="text" placeholder="Username" className="mb-2" required />
//                 <Form.Control name="password" type="password" placeholder="Password" className="mb-2" required />
//                 <div className="admin_checkbox mb-2">
//                   <Form.Check
//                     style={{ width: '20px' }}
//                     type="checkbox"
//                     id="admin_login"
//                     label={<span className="blinking-bold">"Only If You Are Admin"</span>}
//                     name="adminlogin"
//                   />
//                 </div>
//                 <Button type="submit">Sign In</Button>
//               </Form>
//             </div>

//             {/* Overlay */}
//             <div className="overlay-container">
//               <div className="overlay">
//                 <div className="overlay-panel overlay-left">
//                   <h1>Welcome Back!</h1>
//                   <p>If you already have an account, sign in here</p>
//                   <Button variant="outline-light" ref={signInBtnRef} className="ghost">
//                     Sign In
//                   </Button>
//                 </div>
//                 <div className="overlay-panel overlay-right">
//                   <h1>Hello, Officer!</h1>
//                   <p>Enter your details for contact us and start your journey</p>
//                   <Button variant="outline-light" ref={signUpBtnRef} className="ghost">
//                     For Sign Up
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default LoginModal;
// MultipleFiles/LoginModal.jsx
import React, { useState, useRef, useEffect } from 'react';


const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
   const wrapperRef = useRef(null);
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    if (username) {
      onLoginSuccess(username);
      onClose?.();
    }
  };
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  


  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-wrapper" ref={wrapperRef}>
        <button className="close-btn" onClick={onClose}>×</button>

        <div className={`custom_container ${rightPanelActive ? 'right-panel-active' : ''}`}>
          
          {/* Sign Up Form */}
          <div className="form-container sign-up-container">
            <form>
              <h1>For Sign Up</h1>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Rank" />
              <input type="number" placeholder="Belt Number" />
              <input type="number" placeholder="Mobile Number" />
              <input type="email" placeholder="Email" />
              <button type="submit">Submit</button>
            </form>
          </div>

          {/* Sign In Form */}
          <div className="form-container sign-in-container">
            <form onSubmit={handleLoginFormSubmit}>
              <h1>Sign In</h1>
              <input name="username" type="text" placeholder="Username" required />
              <input name="password" type="password" placeholder="Password" required />
              <label className="checkbox">
                <input type="checkbox" name="adminlogin" />
                <span className="blinking-bold"> Only If You Are Admin</span>
              </label>
              <button type="submit">Sign In</button>
            </form>
          </div>

          {/* Overlay Panels */}
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>If you already have an account, sign in here</p>
                <button className="ghost" onClick={() => setRightPanelActive(false)}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Officer!</h1>
                <p>Enter your details for contact us and start your journey</p>
                <button className="ghost" onClick={() => setRightPanelActive(true)}>For Sign Up</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginModal;