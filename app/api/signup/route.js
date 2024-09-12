import { connectMongoDB } from '@/lib/mongodb';
import { createUser } from '@/queries/users';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export const POST = async (request) => {
  const { name, userName, email, password } = await request.json();

  // Connect to MongoDB
  await connectMongoDB();

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12); // Increased salt rounds for better security

  // Create new user object
  const newUser = {
    name,
    userName,
    email,
    password: hashedPassword,
  };
  try {
    // Create user in the database
    const result = await createUser(newUser);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error('Error during user signup:', error);
    return new NextResponse('Error during user signup:', { status: 500 });
  }
};
