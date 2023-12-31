'use client'
import React, { useState } from 'react'
import '../globals.css'
import NavBar from './NavBar'
import LinePlot from './LinePlot'
import { useAuthContext } from '@/src/context/AuthContext'
import { useRouter } from 'next/navigation'
import LineGraph from './LineGraph'
import getsummaire from '@/src/firebase/firestore/getsummaire'
import getalldocssummaire from '@/src/firebase/firestore/getalldocssummaire'
const page = () => {
  const [data, setdata] = React.useState('')
  const [vdata, setvdata] = React.useState(null)
  const { user } = useAuthContext()
  const [ac, setac] = useState(false)
  const router = useRouter()
  const opts = React.useRef([])
  const isFirstRender = React.useRef(true)
  const [op, setop] = React.useState(false)
  React.useEffect(() => {
    if (isFirstRender) {
      isFirstRender.current = false
      if (user != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setac(true)
            // getsummaire('IFT510').then((result, error) => {
            //   console.log(result, 'bhaiyaaa')
            // })
            getalldocssummaire().then((result, error) => {
              console.log(result)
              setop(true)
              opts.current = result.send
            })
          } else {
            setac(false)
            alert('Not Authorized')
            router.replace('/UserDashBoard')
          }
        })
      } else {
        router.replace('/Login')
      }
    }
  }, [user])
  return (
    ac && (
      <div>
        <NavBar username={'Admin'} />
        <div className='prose flex items-center justify-center text-xl normal-case'>
          Visualize Enrollment Data With Class ID
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
                getsummaire(data).then((result, error) => {
                  setvdata(result.data)
                  console.log(result.data, 'res.send get summaire', result)
                })
              }}
            >
              Visualize
            </button>
          </div>
        </div>
        <br />
        {/* <LinePlot data={["2020-11-1","2020-11-2","2020-11-3","2020-11-4"]} datay={[2,3,4,5]} /> */}
        {data && data != '' && vdata && (
          <LineGraph
            data={Object.entries(
              Object.keys(vdata)
                .sort()
                .reduce(function (result, key) {
                  result[key] = vdata[key]
                  return result
                }, {})
            )}
          />
        )}
      </div>
    )
  )
}

export default page
