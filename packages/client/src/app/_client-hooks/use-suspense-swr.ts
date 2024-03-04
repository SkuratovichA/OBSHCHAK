'use client'


// TODO investigate what's wrong with it and why I use it at all
export const swrCallback = () => <T, S>([uri, params]: [string, T]) => fetcher<T, S>(uri, params)

// TODO: not tested
export const fetcher = async <T, S>(url: string, params: T, timeout = 5000): Promise<S> => {
  console.log('USE SUSPENSE SWR: fetcher: url: ', url, 'params: ', params)

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
