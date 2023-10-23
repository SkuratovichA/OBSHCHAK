'use client'

import React, { useCallback } from 'react'
import { API_PATH, API_VER } from 'app-common'


const Login: React.FC = () => {
  const handleLogin = useCallback(async () => {
    try {
      window.location.href = `${API_PATH}/v${API_VER}/auth/google`
    } catch (e: any) {
      console.log(e)
    }
  } , [])

  return <div onClick={handleLogin}>Redirecting to Google for authentication</div>
}

export default Login