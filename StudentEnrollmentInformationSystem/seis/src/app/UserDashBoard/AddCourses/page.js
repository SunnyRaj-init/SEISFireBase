'use client'
import React from 'react'
import '../../globals.css'
import NavBar from '../NavBar'
import { useState } from 'react'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import getalldocs from '@/src/firebase/firestore/getalldocs'
import addDataseis from '@/src/firebase/firestore/adddata'
const page = () => {
  const [data, setdata] = React.useState('')
  const { user } = useAuthContext()
  const router = useRouter()
  const opts = React.useRef([])
  const isFirstRender = React.useRef(true)
  const [op, setop] = React.useState(false)
  const [enrolled, setenrolled] = React.useState(false)
  const count = React.useRef(0)
  React.useEffect(() => {
    // console.log(user)
    if (isFirstRender) {
      isFirstRender.current = false
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            router.replace('/AdminDashBoard')
          } else {
            // console.log(user.uid, 'users uid')
            getalldocs(user.uid).then((result, error) => {
              // console.log(i, 'hooii ayyee')
              if (result) {
                console.log(result.send, 'heheh result at getdocsallbyuid')
                count.current = result.send.pop()
                opts.current = result.send
                setop(true)
                if (count.current >= 3) {
                  alert('MAX REGISTRATION REACHED')
                  router.replace('/UserDashBoard')
                }
              }
              if (error) console.log(error)
            })
          }
        })
      } else {
        router.replace('/Login')
      }
    }
  }, [user, enrolled])
  return (
    <div>
      <NavBar pagename={'Add Courses'} />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        Search & Enroll into Courses using Class ID (You can Enroll into a
        maximum of 3 courses!)
      </div>
      <br />
      <br />
      <div className='join prose flex items-center justify-center text-xl normal-case'>
        <select
          className='select join-item select-bordered w-full max-w-xs'
          defaultValue={'Choose a Course'}
          onChange={(e) => setdata(e.target.value)}
        >
          <option disabled>Choose a Course</option>
          {op &&
            opts.current.map((ele) => {
              return <option key={ele}> {ele}</option>
            })}
        </select>
        <button
          className='btn join-item rounded-r-full'
          onClick={(e) => {
            // setdata(e)
            if (data !== '' && user != null) {
              addDataseis(user.uid, data).then((result, error) => {
                if (result) {
                  console.log(result, 'adddeddd hehehe')
                  setenrolled(true)
                  // console.log('data', data, 'boiii')
                  alert('enrollment successful')
                  router.replace('/UserDashBoard')
                }
              })
              console.log(data)
            } else {
              alert('You have reached Registration limit')
              router.replace('/UserDashBoard')
            }
          }}
        >
          Enroll
        </button>
      </div>
      <br />
      <br />
      <div className='prose flex items-center justify-center text-xl normal-case'>
        {enrolled && <p>Enrolled into '{data}'</p>}
      </div>
    </div>
  )
}

export default page