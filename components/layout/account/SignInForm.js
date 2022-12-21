import styles from '../../../styles/components/layout/account/SignIn.module.css';

export default function SignInForm(props) {
    return (
        <div className={styles['signin-modal']}>
          <input type="email" id="email" name="email" placeholder="Email" />
          <br />
          <input type="password" id="password" name="password" placeholder="Password" />
          <br />
          <button type="submit" onClick={props.signInWithEmail}>Login</button>
          <br />
          <span onClick={props.forgotPassword}>Forgot Password</span>
          <br />
          <span onClick={props.createAccountModal}>Create Account</span>
          <br />
          <span onClick={props.signInWithGoogle}>Sign In with Google</span>
        </div>
    );
  }