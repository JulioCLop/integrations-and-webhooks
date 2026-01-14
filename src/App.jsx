import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Services from './pages/Services'
import Webhooks from './pages/Webhooks'
import Debug from './pages/Debug'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/webhooks" element={<Webhooks />} />
          <Route path="/debug" element={<Debug />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
