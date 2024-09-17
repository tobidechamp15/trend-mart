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

          return {
            id: user._id,
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
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
