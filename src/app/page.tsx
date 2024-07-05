import Link from "next/link";
import { auth, signIn, signOut } from "../../auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
 
  if (session && session.user) {
    return (
      <>
        <main className=" p-4 space-y-4  rounded grid place-content-center min-h-screen">
          <div className="space-y-2 ">
            <img
              src={session?.user?.image ?? ""}
              alt="img"
              className="w-20 aspect-square "
            />
            <p>Role: {session?.user?.role}</p>
            <p>Name: {session?.user?.name}!</p>
            <p>Email: {session?.user?.email}!</p>
          </div>
          <div className="flex">
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 border-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Deconnexion
                </button>
              </form>
              <Link href="/Admin-Dashboard">
                <button
                  type="button"
                  className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 "
                >
                  Admin-Dashboard
                </button>
              </Link>
            </div>
        </main>
      </>
    );
  }
  return (
    <main className="w-full p-4 grid place-content-center min-h-screen">
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 border-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}
