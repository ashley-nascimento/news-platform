import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/Header'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from '../styles/home.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Início | Plataforma de Notícias</title>
      </Head>
      <Header/>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, bem-vindo(a)</span>
          <h1>Notícias sobre o mundo do <span>React</span></h1>
          <p>Tenha acesso a todas as publicações <br />
          <span>por R$ 9,90/mês</span>
          </p>
          <SubscribeButton />
        </section>
        
        <img src="/images/girl.svg" alt="Garota Programando" />
      </main>
    </>
  )
}

export default Home
