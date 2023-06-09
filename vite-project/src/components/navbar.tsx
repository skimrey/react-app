import {useState} from 'react'
import {Link} from 'react-router-dom'
import Button from './Button'
import { signInWithPopup } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { auth, Providers } from '../config/firebase'


function Navbar() {
    const [isVisible, setIsVisible] = useState(false)
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }
  
    const signOutOnClick = async () => {
      signOut(auth)
      await delay(100);
      location.reload();
    }

    const signInOnClick = async () => {
      const response = await signInWithPopup(auth, Providers.google);
      if( response.user) {
        location.reload();
      }
    }

    const dropDown = async () => {
      setIsVisible(!isVisible)
    }
  
    const clicked = () => {
      setIsVisible(false)
    }
  
    return (
      <nav className='flex items-center justify-between flex-wrap bg-teal-500 p-6'>
          <div className='flex items-center flex-shrink-0 text-white mr-6'>
              <Link to='/' className='font-semibold text-xl tracking-tight'>Park It</Link>
          </div>
          <div className="block">
              <button 
                  onClick={dropDown}
                  className="flex items-center px-3 py-2 text-teal-200 
                  border rounded border-teal-400 hover:text-white hover:border-white"
                  >
                      <i className="fas fa-bars"></i>
              </button>
          </div>
          { isVisible ? ( 
            <div className='w-full block '>
                <div className="text-sm right-0 ">
                    
                        <Button className="p-3 m-1 bg-teal-400 justify-center">
                            <div>
                            <Link to='/' onClick={clicked} className='flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Home</Link>
                            </div>
                        </Button>
                        
                        
                        
                        {
                          auth.currentUser ?
                        <Button className="p-3 m-1 bg-teal-400 justify-center">
                            <div>
                            <Link to='/dashboard' className='flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'>Dashboard</Link>
                            </div>
                        </Button> 
                        :
                        <></>
                         }
                        {
                          !auth.currentUser ? 

                          <Button className='p-3 m-1  bg-teal-400'> 
                            <div>
                              <Link to="/" onClick={ () => {signInOnClick()}} className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                Login
                              </Link>
                            </div>
                          </Button>
                          :
                          <Button className='p-3 m-1 bg-teal-400 justify-center'> 
                            <div>
                              <Link to="/" onClick={ () => {signOutOnClick()}} className="flex place-items-center lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
                                Sign Out
                              </Link>
                            </div>
                          </Button>
                          
                        }
                </div>
            </div>
            ) : ( 
            <></>
        )}
      </nav>
    )
  }
  

export default Navbar