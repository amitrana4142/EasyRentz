import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      //className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
      className='px-4 py-2 w-full font-semibold mx-auto border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black dark:text-black hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 hover:shadow transition duration-150'
    >
      <div className='mx-auto flex flex-row g-2 '> 

     <img className="w-6 h-6 mx-4" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
      <p className='font-bold'>
        Continue with google
        </p> 
      </div>
    </button>
  );
}
