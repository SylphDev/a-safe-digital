import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import FullLayout from "src/layouts/fullLayout";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <FullLayout>
      <div>
        <h1>Welcome to the Dashboard</h1>
        {session && <h2>Hello, {session.user?.name}!</h2>}{" "}
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </FullLayout>
  );
}

// Protect this page from unauthenticated users
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log("session", session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
