import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route}  from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';


function Layout({ children, showHeader = true, showFooter = true }) {
  return (
    <>
      {showHeader && <Header />}
      <main className={showHeader ? "pt-16" : ""}>
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  );
}





function App() {
  return (
  <AuthProvider> 
    
    <Router>
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout showHeader={false} showFooter={false}><Login /></Layout>} />
        <Route path="/register" element={<Layout showHeader={false} showFooter={false}><Register /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/host-session" element={<Layout><HostSession /></Layout>} />
        <Route path="/join-session" element={<Layout><JoinSession /></Layout>} />
      </Routes>
    </div>
    </Router>
  </AuthProvider>
);
}

export default App;
