'use client'

import pagePaths from "@/utils/pagePaths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push(pagePaths.login)
  }, [router])

  return null
}
