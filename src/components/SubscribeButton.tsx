import { signIn, useSession } from 'next-auth/react'
import styles from '../styles/subscribeButton.module.scss'

export function SubscribeButton(){
    const { data: session } = useSession()

    function handleSubscribe(){
        if(!session){
            signIn('github')
            return
        }

         

    }

    return(
        <button 
            type="button" 
            className={styles.subscribeButton}
            onClick={handleSubscribe}
            >
            Inscreva-se agora
        </button>
    )
}