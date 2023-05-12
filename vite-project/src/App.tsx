import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import routes from './config/routes'
import Navbar from './components/navbar'
import { Provider } from 'react-redux'

function App() {

  return (
  <BrowserRouter>
    <Navbar />
      <Routes>
        {routes.map((route: any, index: any) => (
          <Route 
            key = {index}
            path={route.path}
            element={
                <route.component />
            }
            />
        ))}
      </Routes>
    </BrowserRouter>
  )
}

export default App
