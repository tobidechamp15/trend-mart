import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          const matchedPassword = await bcrypt.compare(password, user.password);
          if (!matchedPassword) {
            return null;
          }

          // Returning the minimal user object
          return {
            id: user._id,
            email: user.email, // Only returning email and id for authorization
            userName: user.userName, // Only returning email and id for authorization
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Using JWT strategy for session handling
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // When user signs in, add user ID to the token
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Connect to MongoDB to fetch the user's full data every time session is accessed
      try {
        await connectMongoDB();
        const user = await User.findById(token.id);

        if (user) {
          // Attach full user data to session
          session.user.id = user._id;
          session.user.name = user.name;
          session.user.email = user.email;
          session.user.username = user.userName; // Assuming there's a 'username' field
        }
      } catch (error) {
        console.log('Error fetching user from DB in session callback:', error);
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
