import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'your username'
                },
                password: {
                    label: "Password",
                    type: "password",
                    password: "your password"
                }

            },
            async authorize(credentials) {
                //This is where you need to retrieve user data from database. For this project, we use a mock data user. 
                const mockuser = {id: "1", name: "admin", password: "asafe"}

                if(credentials?.username === mockuser.name && credentials.password === mockuser.password){
                    return mockuser
                }else{
                    return null
                }
            }
        })
    ],
    pages: {

    }
}