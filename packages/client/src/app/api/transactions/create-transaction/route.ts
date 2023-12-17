import { NextApiRequest, NextApiResponse } from 'next'
import { API_VER } from 'app-common'

const postHandler = async (res: NextApiResponse, req: NextApiRequest) => {
  try {
    const response = (await fetch(`/v${API_VER}/create-transaction`)).json()
    res.status(200).json(response)
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
}

export { postHandler as POST }
