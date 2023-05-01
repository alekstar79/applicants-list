import { BASE_URL } from '@/composable/constants'

/**
* @param {String} endpoint
* @return {Promise<Applicant[]>}
*/
export async function api(endpoint)
{
  const raw = await fetch(`${BASE_URL}${endpoint}`)

  return await raw.json()
}
