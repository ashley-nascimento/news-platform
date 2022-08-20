import { fauna } from "../../../services/fauna"
import { query as q } from 'faunadb'
import { stripe } from "../../../services/stripe"

export async function saveSubscription(
    subscriptionId: string, 
    costumerId: string
    ){
        
   console.log(subscriptionId, costumerId)

   const userRef =  await fauna.query(

        q.Select(
            'ref',
            q.Get(
                q.Match(
                    q.Index('user_by_stripe_costumer_id'),
                    costumerId
                )
            )
        )
    )
    const subscription =  await stripe.subscriptions.retrieve(subscriptionId)

    await fauna.query(
        
    )
}