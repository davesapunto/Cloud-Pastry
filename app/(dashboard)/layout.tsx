'use client'
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Readex_Pro } from "next/font/google";
import { useRouter } from 'next/navigation';
import { initFirebase, db } from '@/app/config/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

initFirebase();

const readexPro = Readex_Pro({
  subsets: ['latin'],
  weight: ['400', '700']
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const usersCollection = collection(db, 'user');
        const userQuery = query(usersCollection, where('email', '==', user.email));
        const userQuerySnapshot = await getDocs(userQuery);

        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          if (userDoc.data().user === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            router.push('/');
          }
        } else {
          setIsAdmin(false);
          router.push('/');
        }
      } else {
        setIsAdmin(false);
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return (
    <html lang="en">
      <link rel="icon" href="/Paccino Logo.png" sizes="any" />
      <body className={readexPro.className}>
        {isAdmin && <main>{children}</main>}
      </body>
    </html>
  );
}