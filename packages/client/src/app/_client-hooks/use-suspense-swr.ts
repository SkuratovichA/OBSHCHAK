'use client'


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

    console.log('DATA ARE FETCHED')

    if (!response.ok) {
      console.log('We fucked up')
      // Consider throwing an application-specific error with more details
      throw new Error(`Fetch request to ${url} failed with status: ${response.status}`)
    }

    const jsonResponse = await response.json()
    console.log('response JSON: ', jsonResponse)

    return jsonResponse
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
