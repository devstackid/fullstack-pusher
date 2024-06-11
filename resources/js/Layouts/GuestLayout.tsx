import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-secondary">
            <div className='flex w-full max-w-md flex-col space-y-6 overflow-hidden  p-6 '>
                <Link href="/" className='mx-auto w-20'>
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
                    <h1 className='text-base font-bold text-black text-center dark:text-white'>Devstack Livechat <span className='block text-xs font-normal'>Harap masuk untuk melanjutkan</span></h1>
                {children}
            </div>

        </div>
    );
}
