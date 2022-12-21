import styles from '../../../styles/components/layout/account/SignIn.module.css';

export default function SignUpForm(props) {
    return (
      <div className={styles['signin-modal']}>
        <input type="email" id="email" name="email" placeholder="Email" />
        <br />
        <input type="password" id="password" name="password" placeholder="Password" />
        <br />
        <input type="password" id="password2" name="password2" placeholder="Verify Password" />
        <br />
        <input type="text" id="alias" name="alias" placeholder="Alias" />
        <br />
        <button type="submit" onClick={props.createEmailUser}>Sign Up</button>
        <br />
        <span onClick={props.createAccountModal}>Cancel</span>
      </div>
    );
  }