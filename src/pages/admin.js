import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Admin.module.css";

import {AiOutlineUser, AiFillLock} from "react-icons/ai"

function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLoadingIcon, setShowLoadingIcon] = useState(false);

  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    console.log("fired")
    if (showErrorMessage && (!isMovingRight || isMovingLeft)) {
      setIsMovingRight(true);
      setIsMovingLeft(false);
    }
  }, [showErrorMessage]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if(password!="")
      {
        setShowErrorMessage(false);
      setIsMovingRight(true);
      setIsMovingLeft(false);
      }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if(username!=""){
      setShowErrorMessage(false);
      setIsMovingRight(true);
      setIsMovingLeft(false);
    }
     

  };


  
  const handleButtonClick = () => {
    if (!username || !password) {
      setShowErrorMessage(true);
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
      
      // Implement your login logic here
      tryLogin().then(()=>{
        console.log("Error ovde"+showErrorMessage);
        if(showErrorMessage) return;
        setShowErrorMessage(false);
        setIsMovingRight(true);
        setIsMovingLeft(false);
        setShowLoadingIcon(true);
        setShowErrorMessage(false);
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
      const response = await fetch('https://arliving.herokuapp.com/arliving/pb_log_in_restaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          user_name: username,
          password: password
          //ovo otkomentarisi kad API dobijes od Paje
          /*
          username: 'username',
          password: 'password'*/
        }),
        
      });

      

      const responseData = await response.json();
      if (responseData.error) {
        console.log("nema brt");
        setShowErrorMessage(true);
        setShowErrorMessage(true);
        console.log("Error "+showErrorMessage)
        return;
      }
      setUser(responseData);
      console.log("Successful login!");
      console.log(responseData.id);
      sessionStorage.setItem("restaurant", JSON.stringify(responseData));
      console.log(sessionStorage.getItem("restaurant"))
      
    } catch (error) {
      //setShowErrorMessage('An error occurred while fetching data');
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
        {showErrorMessage && (
          <p style={{ marginLeft: '5px',  marginRight: '4px',  marginBottom:'-15px', display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
            className={`${styles.error} ${isMovingRight ? styles.moveUp : ""} ${
              isMovingLeft ? styles.moveDown : ""
            }`}
          >
            <span className={styles.textCenter}>Please enter both username and password</span>
          </p>
        )}
        <div className={styles.loadingWrapper}>
          {showLoadingIcon && (
            <div className={styles.wineGlassesWrapper}>
              <div className={`${styles.wineGlass} ${styles.leftWineGlass}`}></div>
              <div className={`${styles.wineGlass} ${styles.rightWineGlass}`}></div>
            </div>
          )}
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
