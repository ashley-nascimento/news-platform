import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import styles from '../styles/home.module.scss'

interface HomeProps{
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Início | Plataforma de Notícias</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, bem-vindo(a)</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>Tenha acesso a todas as publicações <br />
          <span>por {product.amount}/mês</span>
          </p>
          <SubscribeButton />
        </section>
        
        <img src="/images/girl.svg" alt="Garota Programando" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LKXyqEUXQfpvlEEKsp1IVLf')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR',{
      style: 'currency',
      currency: 'BRL'
    }).format(+price.unit_amount! / 100), 
  }
  
  return{
    props:{
      product
    },
    revalidate: 60 * 60 * 24, //24 horas 
  }
}

