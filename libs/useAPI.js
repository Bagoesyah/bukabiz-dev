import useRequest from "./useRequest"

export function useGet(endpoint, req = {}) {
  const { data, error } = useRequest(
    {
      method: 'GET',
      url: process.env.urlAPI + endpoint,
      params: req.params
    },
    {
      revalidateOnFocus: false
    }
  )

  return {
    isData: data,
    isLoading: !error && !data,
    isError: error
  }
}

export function usePost(endpoint, req = {}) {
  const { data, error } = useRequest(
    {
      method: 'POST',
      url: process.env.urlAPI + endpoint,
      params: req.params
    },
    {
      revalidateOnFocus: false
    }
  )

  return {
    isData: data,
    isLoading: !error && !data,
    isError: error
  }
}