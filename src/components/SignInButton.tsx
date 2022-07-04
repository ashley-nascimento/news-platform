import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from '../styles/signInButton.module.scss'

export function SignInButton(){

    const isUserLoggedIn = true;

    return isUserLoggedIn ? (
        <button 
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#C2F784" />
            Ashley Nascimento
            <FiX color="#A8A8B3" className={styles.closeIcon} />
        </button>
    )   :   (
        <button 
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#FFF47D" />
            Entre com o Github
        </button>
        
    )

}