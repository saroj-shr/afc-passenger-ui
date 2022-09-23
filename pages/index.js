import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LandingPagePWA() {
  const { data: session } = useSession();

  return (
    <>
      <section className="h-screen">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img src="/draw2.svg" className="w-full" alt="Phone image" />
            </div>

            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">
                Automated Fare Collection System <br />
                <span className="text-blue-600">User Login</span>
              </h1>
              {!session && (
                <button
                  className="px-7 py-3 text-white bg-slate-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={() => signIn()}
                >
                  <span className="p-1">
                    <FcGoogle />
                  </span>
                  Continue with Google
                </button>
              )}
              {session && (
                <>
                  <button
                    className="inline-block px-7 py-3 mb-2 md:mb-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </button>
                  <button
                    className="inline-block px-7 py-3 mb-2 md:mb-0 md:mr-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out "
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    {/* <Link href="/dashboard">Dashboard</Link> */}
                  </button>
                  <h4>You are logged as: {session.user.name}</h4>
                  <div>
                    <h4>Email: {session.user.email}</h4>
                    <br />
                    {session.user.image && (
                      <span>
                        <img
                          src={session.user.image}
                          className="rounded-full w-32"
                          alt={session.user.name}
                        />
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
