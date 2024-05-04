'use client'
import { ReactNode, useEffect } from "react";
import {useAuthState} from 'react-firebase-hooks/auth'

import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase/client";

export default function Layout({ children }: { children: ReactNode }) {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const userSession = sessionStorage.getItem('user');

  if (!user && !userSession){
    router.push('/')
    return null
  }

  return (
    <div className="pt-40 mx-56 pb-80">
      {children}
    </div>
  );
}
