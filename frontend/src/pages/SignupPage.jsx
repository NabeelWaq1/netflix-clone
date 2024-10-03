import { useState } from "react"
import { Link } from "react-router-dom"
import { authUser } from "../store/authUser";


const SignupPage = () => {
    const {searchParams} = new URL(document.location);
    const emailValue = searchParams.get("email");

    const [email, setEmail] = useState(emailValue || "");
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { SignUp } = authUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        SignUp({email, username, password});
    }
  return (
    <div className="w-full h-screen hero-bg">
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <Link to={'/'}>
                <img src="/netflix-logo.png" alt="logo" className="w-52" />
                </Link>
        </header>

        <div className="flex justify-center items-center mt-20 mx-3">
            <div className="w-full max-w-md shadow-md rounded-lg bg-black/60 space-y-6 p-8">
            <h1 className="text-center text-white font-bold text-2xl mb-4">Sign Up</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block font-medium text-sm text-gray-300">Email</label>
                    <input type="email" id="email" placeholder="you@gmail.com" className="px-3 py-2 w-full mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="username" className="block font-medium text-sm text-gray-300">Username</label>
                    <input type="text" id="username" placeholder="nabeel_waq" className="px-3 py-2 w-full mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring text-white" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium text-sm text-gray-300">Password</label>
                    <input type="password" id="password" placeholder="******" className="px-3 py-2 w-full mt-1 border border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring text-white" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="bg-red-600 hover:bg-red-700 w-full rounded-md py-2 font-semibold text-white" onClick={handleSubmit}>Sign Up</button>
                <div className="text-gray-400 text-center">Already a member? <Link to={'/login'} className="text-red-400 hover:underline">Sign in</Link></div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default SignupPage
