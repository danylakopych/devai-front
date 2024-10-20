import { getUserByEmail } from "@/app/services/users/action";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                
                try {
                    const user = await getUserByEmail(String(credentials?.email));
                    if (!user) {
                        throw new Error('User not found');
                    }
                    
                    if (user) {
                        const isMatch = user?.password === credentials.password;

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error instanceof Error ? error.message : String(error));
                }
            },
        }),
  ],
});
