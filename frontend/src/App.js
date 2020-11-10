import React, {Suspense} from 'react'
import {Header, Loader, ToastMessages} from './components/index'
import {BrowserRouter} from 'react-router-dom'
import Routes from './routes'


const App = () => {

  return (
    <BrowserRouter>
      <Header/>
      <Suspense fallback={<Loader/>}>
        <Routes/>
      </Suspense>
      <ToastMessages/>
    </BrowserRouter>
  )
}

export default App
