import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import './Navbar.css'
import Logo from '../../assets/healthlogo.png'

const Navbar = ({ search, setSearch }) => {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className='header'>
      <nav>
        <Link to='/home'>
          <img
            src={Logo}
            alt='logo.svg'
          />
        </Link>

        <div className='search-container'>
          {currentPath === '/home' && (
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='search-input'
            />
          )}
        </div>

        <div className='nav-items'>
          {/* if User Not LoggedIn show signup/login */}
          {!localStorage.getItem('token') && (
            <Link
              to={currentPath === '/signup' ? '/' : 'signup'}
              className='nav-link'
            >
              <p>{currentPath === '/signup' ? 'Login' : 'Signup'}</p>
            </Link>
          )}

          {/* if User LoggedIn show Home/Upload */}
          {localStorage.getItem('token') && (
            <Link
              to={currentPath === '/home' ? '/upload' : 'home'}
              className='nav-link'
            >
              <p>{currentPath === '/home' ? 'Upload' : 'Home'}</p>
            </Link>
          )}

          {/*show Logout only if loggedin */}

          {localStorage.getItem('token') && (
            <Link
              onClick={() => localStorage.removeItem('token')}
              to='/'
              className='nav-link'
            >
              <p>Logut</p>
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
