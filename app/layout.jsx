import PropTypes from 'prop-types';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connectMongoDB } from '@/lib/mongodb';
import { AuthProvider } from './Providers';

export const metadata = {
  title: 'Trend Mart',
  description: 'Online Shopping for Electronics, Fashion, Home, Beauty & Sport',
};

async function RootLayout({ children }) {
  const conn = await connectMongoDB();
  console.log(conn);
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
