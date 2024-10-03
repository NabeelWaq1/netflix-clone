import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SearchPage from "./pages/SearchPage.jsx"
import Footer from "./components/Footer.jsx"
import { Toaster } from "react-hot-toast"
import { authUser } from "./store/authUser.js"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import Watch from "./pages/Watch.jsx"
import SearchHistoryPage from "./pages/SearchHistoryPage.jsx"
import NotFoundPage from './pages/404.jsx'


function App() {
  const {AuthCheck, user, isAuthChecking} = authUser();
  useEffect(()=>{
    AuthCheck();
  },[AuthCheck])

  if (isAuthChecking) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />
				</div>
			</div>
		);
	}

  return (
    <>
     <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} />}></Route>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />}></Route>
      <Route path="/watch/:id" element={user ? <Watch /> : <Navigate to={"/login"} />}></Route>
      <Route path="/search" element={user ? <SearchPage /> : <Navigate to={"/login"} />}></Route>
      <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}></Route>
      <Route path="/*" element={<NotFoundPage />}></Route>
     </Routes>
     <Toaster />
     <Footer />
    </>
  )
}

export default App
