"use client"
import { useRouter,useSearchParams } from 'next/navigation';
import React from 'react'


const Dashboard = () => {
  const router = useSearchParams();
  const token=router.get("token")

  console.log(token)
  localStorage.setItem("token",token)
 // const { token } = router.query;
  return (
    <div><h1>Welcome to Dashboard!!!</h1></div>
  )
}

export default Dashboard;