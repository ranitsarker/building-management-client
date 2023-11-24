import { Link, useNavigate } from 'react-router-dom'
import { GrGoogle } from "react-icons/gr";
import { imageUpload } from '../../api/Utils';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { PiSpinnerFill } from "react-icons/pi";



const SignUp = () => {
  const {createUser, signInWithGoogle, updateUserProfile, loading} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    try{
      //1. image upload 
      const imageData = await imageUpload(image);
      //2. user register or create user 
      const result = await createUser(email, password);
      //3. update profile 
      await updateUserProfile(name, imageData?.data?.display_url)
      console.log(result);
      toast.success('User created successfully!')

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
      console.log(result);
      toast.success('User sign-up successfully!')
      navigate('/');

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
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
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
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#feba41] bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
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
                autoComplete='new-password'
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
              {loading ? <PiSpinnerFill className="animate-spin m-auto" /> : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
           Google login
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
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-[#feba41] text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
