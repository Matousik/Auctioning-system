import '../styles/globals.css'
import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { UserProvider } from '@/context/UserContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
export default MyApp
