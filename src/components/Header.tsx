import styles from '../styles/header.module.scss'
import { SignInButton } from './SignInButton'

export function Header(){
    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="News" />
                <nav>
                    <a href="#" className={styles.active}>Início</a>
                    <a href="#">Postagens</a>
                </nav>
                <SignInButton/>
            </div>
        </header>
    )
}