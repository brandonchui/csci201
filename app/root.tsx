///////////////////////////////////////////////
///~ root.tsx where all html structure defined here
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { json } from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import Nav from '~/components/Nav';
import Footer from '~/components/Footer';
import './tailwind.css';

///////////////////////////////////////////////
///~ types
interface UserData {
  id: number;
  email: string;
  hashedPassword: string;
  weightPounds: number;
  heightInches: number;
  age: number;
  gender: string;
  goal: string;
}

interface LoaderData {
  userId: number | null;
  userData: UserData | null;
}

///////////////////////////////////////////////
///~ loader
export const loader = async ({ request }) => {
  try {
    const userId = await requireUserId(request).catch(() => null);

    if (!userId) {
      return json<LoaderData>({ userId: null, userData: null });
    }

    const userResponse = await fetch(`https://spring-demo-bc-ff2fb46a7e3b.herokuapp.com/api/users/${userId}`);
    const userData = userResponse.ok ? await userResponse.json() : null;

    return json<LoaderData>({ userId, userData });
  } catch (error) {
    console.error('Error in root loader:', error);
    return json<LoaderData>({ userId: null, userData: null });
  }
};

{/* using diff font from google*/}
export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { userId, userData } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>

    <body>
    <Nav userId={userId} userData={userData} />
    {children}
    <ScrollRestoration />
    <Scripts />
    <Footer />
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}