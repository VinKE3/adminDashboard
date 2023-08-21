import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="relative py-16 bg-gradient-to-br bg-black h-screen flex justify-center items-center">
        <div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
          <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-white shadow-xl">
              <div className="p-6 sm:p-16">
                <div className="space-y-4">
                  <h1 className="text-center font-extrabold">
                    ADMIN-DASHBOARD
                  </h1>
                  <h2 className="mb-8 text-2xl text-center text-black font-bold">
                    Incia sesión para continuar
                  </h2>
                </div>
                <div className="mt-6 grid space-y-4">
                  <button
                    onClick={() => signIn("google")}
                    className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-black"
                  >
                    <div className="relative flex items-center space-x-4 justify-center">
                      <Image
                        src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                        className="absolute left-0 w-5"
                        alt="google logo"
                        width={20}
                        height={20}
                      />
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-black sm:text-base">
                        Continua con Google
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="block md:hidden items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
          <Logo />
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}
