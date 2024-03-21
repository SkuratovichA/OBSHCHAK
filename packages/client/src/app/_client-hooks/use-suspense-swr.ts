'use client'

import type { State } from 'swr'
import useSWR from 'swr'
import type { Maybe } from 'app-common'

// TODO investigate what's wrong with it and why I use it at all
export const swrCallback = <T, S>([uri, params]: [string, T]) => fetcher<T, S>(uri, params)

export const useSwr = <P extends object, R extends Maybe<object>>(endpoint: string, params: P) => {
  // todo: looks like shit :) Why would I need it?
  return useSWR([endpoint, params], swrCallback<P, R>, {}) as State<R>
}

// TODO: not tested
export const fetcher = async <T, S>(url: string, params: T, timeout = 5000): Promise<S> => {

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
      signal: controller.signal,
    })

    clearTimeout(id)

    if (!response.ok) {
      console.log('We fucked up')
      // Consider throwing an application-specific error with more details
      throw new Error(`Fetch request to ${url} failed with status: ${response.status}`)
    }

    return await response.json()
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.name === 'AbortError') {
      console.log('Request timed out')
      throw new Error('Request timeout')
    } else {
      console.log('Unexpected error', error)
      throw error
    }
  }
}
