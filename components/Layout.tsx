import React, { Fragment, useEffect, useState } from 'react'
import TopBar from './TopBar';
import { Transition } from '@headlessui/react';
import SideBar from './SideBar';


function Layout({ children }: any) {
    const [showNav, setShowNav] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const HandleResize = () => {
        if (innerWidth <= 640) {
            setShowNav(false)
            setIsMobile(true)
        } else {
            setShowNav(true)
            setIsMobile(false)
        }
    }

    useEffect(() => {
        if (window != undefined) {
            addEventListener('resize', HandleResize)
        }

        return () => {
            removeEventListener('resize', HandleResize)
        }
    }, [])
    return (
        <div>
            <TopBar showNav={showNav} setShowNav={setShowNav} />
            <Transition
                as={Fragment}
                show={showNav}
                enter='transform transition duration-[400ms]'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform duration-[400ms] transition ease-in-ouy'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
            >
                <SideBar showNav={showNav} />
            </Transition>
            <main className={`pt-16 transition-all duration-[400ms] ${showNav && !isMobile ? 'pl-56' : ''}`}>
                <div className='px-4 md:px-16'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout