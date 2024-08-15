import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';

export async function POST(req) {
  try {
    // Extracting data from the request body
    const { name, userName, password, email } = await req.json();

    await connectMongoDB();
    await User.create({ name, userName, email, password });

    // Define the response message with a status code
    const response = {
      message: `User ${name} with email ${email} has been successfully registered.`,
    };

    // Return the response message with status 201
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    // Handle any errors that occur during the process
    return NextResponse.json(
      { error: 'An error occurred while registering the user.' },
      { status: 500 },
    );
  }
}
