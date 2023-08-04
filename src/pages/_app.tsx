import '@/styles/globals.css'
import type { AppProps } from 'next/app'


import { Provider as AuthProvider } from 'next-auth/react';
import MainLayout from '@/layout/mainLayout';

export default function App({ Component, pageProps }: any) {

  const Layout = Component.layout || MainLayout;

  return <AuthProvider session={pageProps.session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>

}
