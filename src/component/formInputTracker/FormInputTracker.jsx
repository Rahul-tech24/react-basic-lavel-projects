import { useState } from "react";
import styles from './FormInputTracker.module.css'


function FormInputTracker({onSuccess, theme}) {

    const [name, setName] = useState('');
    const [email, setEmail ] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const NAME_LIMIT = 20;
    const PASSWORD_LIMIT = 12;
    

     const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    const isNameLengthValid = name.length <= NAME_LIMIT;
    const isPasswordLengthValid = password.length <= PASSWORD_LIMIT;

    const isNameValid = name.trim() !== '' && isNameLengthValid;
     const isEmailValid = /\S+@\S+\.\S+/.test(email);
     const isPasswordValid = password.length >= 6 && isPasswordLengthValid ;
    const isFormValid = isNameValid && isEmailValid && isPasswordValid;

    function handleSubmit(e) {
        e.preventDefault();
        const newErrors = {};
    if (!isNameValid) newErrors.name = "Name is required";
    if (!isEmailValid) newErrors.email = "Enter a valid email";
    if (!isPasswordValid) newErrors.password = "Password must be at least 6 characters";
     
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted:", { name, email, password });
            // Reset form
            setName('');
            setEmail('');
            setPassword('');
            onSuccess();
        }
    }


    return (
    <div className={`${styles.formContainer} ${theme === 'dark' ? styles.dark : styles.light}`}>
        <form onSubmit={handleSubmit} className={styles.formGroup} noValidate > 
            <div className= {styles.nameInput} >
                <label htmlFor="name">Enter your Name : </label>
                <input type="text" value={name} id="name" className= {isNameValid ? styles.green : styles.red }  onChange={(e) => setName(e.target.value)} placeholder="name"
                aria-describedby="nameError"
                aria-invalid={!isNameValid}
                required
                />
                <p>{name.length}</p>
                {name.length>20 && <p>name cannot be longer than 20 letters</p> }
                {errors.name ? <p id="nameError" className= {styles.errorMessage} >{errors.name}</p> : <p>{name}</p>}

            </div>
                
            <div className= {styles.emailInput} >
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" className= {isEmailValid ? styles.green : styles.red }  onChange={(e) => setEmail(e.target.value)} value={email}
                placeholder="Email"
                aria-describedby="emailError" 
                aria-invalid={!isEmailValid}
                required
                />
                {errors.email ? <p id="emailError" className={styles.errorMessage}>{errors.email}</p> : <p>{email}</p>}

            </div>
                
            <div className={styles.passwordContainer}>
  <label htmlFor="password">Password:</label>
  <div className={styles.inputWrapper}>
    <input
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Password"
      aria-describedby="passwordError"
      aria-invalid={!isPasswordValid}
      required
      className={isPasswordValid ? styles.green : styles.red}
    />
    <button
      type="button"
      className={styles.passwordToggle}
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? '🙈' : '👁️'}
    </button>
  </div>
  <p>{password.length}</p>
  {password.length > PASSWORD_LIMIT && <p className={styles.errorMessage}>password cannot be greater than {PASSWORD_LIMIT} letters</p>}
  {errors.password && <p id="passwordError" className={styles.errorMessage}>{errors.password}</p>}
</div>


                <button type="submit" className={styles.submitButton}  disabled = {!isFormValid} >Submit</button>

            </form>
        </div>
    )
    
}
export default FormInputTracker;
