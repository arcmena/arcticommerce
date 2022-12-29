import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import Spinner from '../Spinner/Spinner'

type ButtonVariant = 'filled' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
}

const defaultStyles =
  'uppercase h-[45px] px-4 pointer leading-[45px] tracking-[1px] text-[13px] md:text-[14px] rounded-[2px]'

const filledVariantStyles = 'text-white bg-[#111111]'

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = 'filled',
    loading = false,
    ...rest
  } = props

  const classes = cn(
    defaultStyles,
    {
      [filledVariantStyles]: variant === 'filled'
    },
    className
  )

  return (
    <button className={classes} disabled={loading} {...rest}>
      {loading ? (
        <Spinner className="h-6 w-6 stroke-white mx-auto" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  )
}

export default Button
