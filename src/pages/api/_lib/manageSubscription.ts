import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { stripe } from '../../../services/stripe'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false
) {

    const userRef = await fauna.query(
        q.Select(
            'ref',
            q.Get(
                q.Match(
                    q.Index(
                        'user_by_stripe_customer_id'
                    ), 
                    customerId
                )
            )
        )
    ).then((ret) => console.log(ret))
    .catch((err) => console.error(
      'Error: [%s] %s: %s',
      err.name,
      err.message,
      err.errors()[0].description,
    ))

    console.log(userRef)

    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id,
    }

    if (createAction) {

        await fauna.query(
            q.Create(
                q.Collection(
                    'subscriptions'
                ), 
                { data: subscriptionData }
            )
        )

    } else {
        await fauna.query(
            q.Replace(
                q.Select(
                    'ref',
                    q.Get(
                        q.Match(
                            q.Index(
                                'subscription_by_id'
                            ), 
                            subscriptionId
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}