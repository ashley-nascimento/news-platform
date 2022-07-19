import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { fauna } from '../../../services/fauna'

import { query as q } from 'faunadb'

export default NextAuth({
  providers: [
    GithubProvider({
      checks: "state",
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user"
        }
      }
    }),
  ],
  jwt:{
    secret: process.env.NEXTAUTH_SECRET
  },
  callbacks:{
    async signIn({ user }){
      const { email } = user

      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email!)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email!),
              )
            )
          )
        )
        return true
      }
      catch{
        console.log('deu erro')
        return false
      }
    }
  }
})