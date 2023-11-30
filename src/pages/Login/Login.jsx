import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GrGoogle } from "react-icons/gr";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { PiSpinnerFill } from "react-icons/pi";
import { getToken, saveUser } from '../../api/Auth';

const Login = () => {
  const {signIn, signInWithGoogle, loading} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location?.state?.from?.pathname)
  const from = location?.state?.from?.pathname || '/';
  // user login with 2 things 
  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    try{
      //1. user sign In 
      const result = await signIn(email, password);
      await getToken(result?.user?.email)
      toast.success('Login Successfully!')
      navigate('/');

    }
    catch(err){
      // console.log(err);
      toast.error(err?.message)
    }
  }
  // google login 
  const handleGoogleSignIn = async () => {
    try{
      //1. user register or create user 
      const result = await signInWithGoogle();
      const dbResponse = await saveUser(result?.user)
      console.log(dbResponse);
      await getToken(result?.user?.email)
      toast.success('User sign-up successfully!')
      navigate(from, {replace: true});

    }
    catch(err){
      // console.log(err);
      toast.error(err?.message)
    }

  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#feba41] bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#feba41] bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-[#feba41] w-full rounded-md py-3 text-white'
            >
              {loading ? <PiSpinnerFill className="animate-spin m-auto" /> : 'Continue'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div 
        onClick={handleGoogleSignIn}
        className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
          <GrGoogle size={32} />

          <p>Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/sign-up'
            className='hover:underline hover:text-[#feba41] text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
