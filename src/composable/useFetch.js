import { useStore, FETCH_APPLICANTS_LIST } from '@/store'

export function useFetch()
{
  const store = useStore()

  /**
   * Fetch list of applicants
   * @return {Promise<void>}
   */
  const fetchApplicantsList = async () => {
    await store.dispatch(FETCH_APPLICANTS_LIST)
  }

  return {
    fetchApplicantsList
  }
}
