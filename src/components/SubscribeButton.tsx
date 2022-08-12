import { signIn, useSession } from 'next-auth/react'
import { api } from '../services/api'
import styles from '../styles/subscribeButton.module.scss'

export function SubscribeButton(){
    const { data: session } = useSession()

    async function handleSubscribe(){
        if(!session){
            signIn('github')
            return
        }

        try{ 
            const response = await api.post('subscribe')

            const { sessionId } = response.data
        }
        catch{

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