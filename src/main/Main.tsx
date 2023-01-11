import { MantineProvider } from '@mantine/core'
import React from 'react'
import App from 'src/components/App/App'

const Main = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  )
}

export default Main
