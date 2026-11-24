import { useEffect, useState } from 'react'

export function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/')
  useEffect(() => {
    const onHash = () => { setRoute(window.location.hash.slice(1) || '/'); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export function go(path: string) {
  window.location.hash = path
  window.scrollTo({ top: 0 })
}
