import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/models/user';
import { connectMongoDB } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB(); // Ensure MongoDB connection

          // Retrieve the user from the database
          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('No user found with this email'); // User not found
          }

          // Check if the password matches
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {
            throw new Error('Invalid password'); // Incorrect password
          }

          // Return user object including ID (this will be available in the JWT and session callbacks)
          return {
            id: user._id, // Using MongoDB's ObjectId (_id) as user id
            email: user.email,
            name: user.name,
            userName: user.userName,
          };
        } catch (error) {
          throw new Error('Authentication failed'); // Return error if any
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt', // Use JWT strategy to persist user info in the session
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: '/login', // Customize sign-in page
  },

  callbacks: {
    async jwt({ token, user }) {
      // If user exists (on initial login), attach user ID to the token
      if (user) {
        token.id = user.id; // Store the user ID in the token
      }
      return token;
    },

    async session({ session, token }) {
      // Attach the user ID from token to session object
      session.user.id = token.id; // Add the user ID to the session user object
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
