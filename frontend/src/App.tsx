import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { ProjectArchitecturePage } from './pages/ProjectArchitecturePage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="overflow-x-clip">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects/:slug/architecture"
            element={<ProjectArchitecturePage />}
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
