import { useEffect, useRef } from 'react'

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback
  useEffect(() => {
    const timeoutId = setTimeout(() => callbackRef.current(), delay)
    return () => clearTimeout(timeoutId)
  }, [delay])
}