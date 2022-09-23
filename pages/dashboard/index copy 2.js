import { useSession, signIn, signOut, getSession } from "next-auth/react";

const dashboardIndex = () => {
  const { data: session } = useSession();

  return (
    <>
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
    </>
  );
};

export default dashboardIndex;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (!session.verifiedUser) {
    return {
      redirect: {
        destination: "/user-registration",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
