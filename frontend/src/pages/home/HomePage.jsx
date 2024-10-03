import { authUser } from '../../store/authUser.js';
import AuthScreen from './AuthScreen.jsx'
import HomeScreen from './HomeScreen.jsx';

const HomePage = () => {
  const {user} = authUser();
  
  return <> {user ? <HomeScreen /> : <AuthScreen />} </>
  
}

export default HomePage