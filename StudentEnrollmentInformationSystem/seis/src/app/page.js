'use client'
import React from 'react'
import Link from 'next/link'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  const { user } = useAuthContext()
  React.useEffect(() => {
    // console.log(user)
    if (user != null) {
      user.getIdTokenResult().then((idTokenResult) => {
        if (idTokenResult.claims.admin) {
          router.replace('/AdminDashBoard')
        } else {
          router.replace('/UserDashBoard')
        }
      })
    }
  }, [user])
  return (
    <div>
      <main>
        <h1>HELLO WORLD</h1>
      </main>
      <div className='card-actions justify-center'>
        <Link href='/Login'>
          <button className='btn btn-primary'>Login</button>
        </Link>
      </div>
    </div>
  )
}

export default page
