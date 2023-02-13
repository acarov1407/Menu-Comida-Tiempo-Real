import '@/styles/globals.css'
import '@/styles/spinner.css'
import { KioskProvider } from "@/context/KioskProvider"

export default function App({ Component, pageProps }) {
  return (
    <KioskProvider>
      <Component {...pageProps} />
    </KioskProvider>

  )
}
