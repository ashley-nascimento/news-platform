import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from '../styles/signInButton.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"

export function SignInButton(){
    const { data: session } = useSession()

    return session ? (
        <button 
            type="button"
            className={styles.signInButton}
        >
            <FaGithub color="#04d361" />
            {session?.user?.name}
            <FiX 
                color="#A8A8B3" 
                className={styles.closeIcon}
                onClick={() => signOut()}
            />
        </button>
    )   :   (
        <button 
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color="#Eba417" />
            Entre com o Github
        </button>
        
    )

}