import React from 'react'
import './Spinner.css'
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

const styles = {
  sm: 'spinner-sm',
  md: 'spinner-md',
  lg: 'spinner-lg',
} as const

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(function Spinner({ size = 'sm' }: Props) {
  return (
    <svg className={styles[size]} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
})
