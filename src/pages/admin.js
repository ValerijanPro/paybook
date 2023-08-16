import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Admin.module.css";

import {AiOutlineUser, AiFillLock} from "react-icons/ai"

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (error && (!isMovingRight || isMovingLeft)) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    }
  }, [error]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if(password!="")
      {
        setError(false);
      setIsMovingRight(true);
      setIsMovingLeft(false);
      }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if(username!=""){
      setError(false);
      setIsMovingRight(true);
      setIsMovingLeft(false);
    }
     

  };


  
  const handleButtonClick = () => {
    if (!username || !password) {
      setError(true);
      if (!isMovingRight && !isMovingLeft) {
        setIsMovingRight(true);
      } else if (isMovingRight) {
        setIsMovingRight(false);
        setIsMovingLeft(true);
      } else if (isMovingLeft) {
        setIsMovingLeft(false);
        setIsMovingRight(true);
      }
    } else {
      setError(false);
      setIsMovingRight(true);
      setIsMovingLeft(false);
      // Implement your login logic here
      tryLogin().then(()=>{
        setShowLoadingIcon(true);
        //delay 1s onako cisto;
        setTimeout(() => {
          console.log("Logged in bro!");
          //ASK:
          //staviti u neki sessionStorage user-a?
          router.push('/orders');
        }, 1000);
        console.log("Logged in bro!");
        
      });
    }
  };

  const tryLogin = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers here if needed
        },

        body: JSON.stringify({
          title: 'Sample Post Title',
          body: 'This is the content of the post.',
          userId: 1,
          //ovo otkomentarisi kad API dobijes od Paje
          /*
          username: 'username',
          password: 'password'*/
        }),
        
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const responseData = await response.json();
      setUser(responseData);
      console.log("Successful login!");
      
    } catch (error) {
      setError('An error occurred while fetching data');
    }
  };

  return (
    <div className={styles.container}>
      
      <form>
      
        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.inputLabel}>
            <div className={styles.labelRow}>
              <AiOutlineUser style={{ height:'100%' , width:'100%'}} /> 
              <div className={styles.inputText}>Username:</div> 
            </div>
            
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            <div className={styles.labelRow}>
                <AiFillLock style={{ height:'100%' , width:'100%'}} /> 
                <div className={styles.inputText}>Password:</div> 
            </div>
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </div>
        </div>
        {error && (
          <p
            className={`${styles.error} ${isMovingRight ? styles.moveUp : ""} ${
              isMovingLeft ? styles.moveDown : ""
            }`}
          >
            Please enter both username and password
          </p>
        )}
        <div className={styles.loadingWrapper}>
          {showLoadingIcon && <div style={{ display:'flex' }}><div className={styles.ldshourglass}></div><div className={styles.ldshourglass}></div><div className={styles.ldshourglass}></div><div className={styles.ldshourglass}></div><div className={styles.ldshourglass}></div></div> }
        </div>
        <button
          type="button"
          className={`${styles.loginButton} ${isMovingRight ? styles.moveDown : ""} ${
            isMovingLeft ? styles.moveRight : ""
          }`}
          onClick={handleButtonClick}
        >
          Login
        </button>
      </form>
    </div>
  );
  
}

export default AdminPage;
