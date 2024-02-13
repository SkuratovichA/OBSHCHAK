'use client'

import useSWR from 'swr'

const fetcher = async <T>(url: string, params: T): Promise<any> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.')
  }
  return await response.json()
}

export const useSuspenseSWR = <T extends Record<string, any>>(key: string, params: T | null) => {

  const { data, error } = useSWR(key, (a: string) => fetcher(a, params), { suspense: true })

  if (error) {
    throw error
  }
  return data
}
