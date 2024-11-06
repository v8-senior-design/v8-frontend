"use client";

import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, ComponentType } from 'react'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const { isAuthenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
      console.log("Auth status:", { loading, isAuthenticated })
      if (!loading && !isAuthenticated) {
        console.log("Redirecting to login due to lack of authentication")
        router.replace('/public/login')
      }
    }, [isAuthenticated, loading, router])


    if (loading || !isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withAuth
