import { QueryClient, QueryClientProvider } from "react-query"
import "../global.css"
import { useState } from "react"

export default function Bangazon({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const [queryClient] = useState(() => new QueryClient())

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
