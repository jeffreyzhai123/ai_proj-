import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, SignOutButton, useUser } from '@clerk/clerk-react'

const Home = (props) => {
  // Use the useUser hook to get the details about the logged in user
  const { user } = useUser()
  const navigate = useNavigate()

  const practiceButton = () => {
    if (user) {
      navigate("/practice");
    }
  }

  const testButton = () => {
    if (user) {
      navigate("/test");
    }
  }


  return (
    <div className="mainContainer">
      {/* The children of the SignedOut component are rendered only when the user is signed out from the app. In this case, the app will render a SignInButton */}
      <SignedOut>
        <div className={'titleContainer'}>
          <div>Welcome!</div>
        </div>
        <div>This is the home page.</div>
        <SignInButton>
          <input className={'inputButton'} type='button' value={'Log in'} />
        </SignInButton>
      </SignedOut>

      {/* The children of the SignedIn component are rendered only when the user is signed in. In this case, the app will render the SignOutButton */}
      <SignedIn>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={practiceButton}
          value={"Practice"}
        />
        <input 
        className={'inputButton'}
        type="button"
        onClick={testButton}
        value={"Test"}
        />
      </div>

        <SignOutButton>
          <input className={'inputButton'} type="button" value={'Log out'} />
        </SignOutButton>
      </SignedIn>

      {/* You can also check if a user is logged in or not using the 'user' object from the useUser hook. In this case, a non-undefined user object will render the user's email on the page */}
      {user ? <div>Your email address is {user.primaryEmailAddress.emailAddress}</div> : null}
    </div>
  )
}

export default Home