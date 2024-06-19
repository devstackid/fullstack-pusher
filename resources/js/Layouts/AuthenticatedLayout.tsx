import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { BsBoxArrowRight } from 'react-icons/bs';
import { User } from '@/types/user';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {

    return (
        <div className="min-h-screen bg-secondary">
            <nav className="bg-background border-b border-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex gap-4 w-full">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto" />
                                </Link>
                            </div>

                                <NavLink href={route('chats.index')} active={false}>
                                    Chats
                                </NavLink>
                        </div>

                        <div className="ml-auto flex items-center">
                            <Link href={route('logout')} as='button' method='post' className='btn btn-secondary flex items-center gap-2 border-none whitespace-nowrap'>
                                <BsBoxArrowRight /> Logout
                            </Link>
                        </div>
                    </div>
                </div>

                
            </nav>

            {header && (
                <header className="bg-background shadow">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 p-4 sm:py-6">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
