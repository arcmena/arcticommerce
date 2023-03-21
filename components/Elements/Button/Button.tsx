import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import Spinner from '../Spinner/Spinner'

type ButtonVariant = 'filled' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  loading?: boolean
}

const defaultStyles =
  'uppercase h-[45px] px-4 pointer leading-[41px] tracking-[1px] text-[13px] md:text-[14px] rounded-[2px] flex justify-center align-center transition-all duration-200'
const filledVariantStyles = 'text-white bg-[#111111] border-2 border-[#111111]'
const outlineVariantStyles = 'text-black bg-white border-2 border-[#111111]'
const disabledVariantStyles = 'bg-[#d2d2d2] border-[#d2d2d2]'
const loadingStyles = 'opacity-70'

const Button = (props: ButtonProps) => {
  const {
    children,
    className,
    variant = 'filled',
    loading = false,
    disabled,
    ...rest
  } = props

  const classes = cn(
    defaultStyles,
    {
      [filledVariantStyles]: variant === 'filled',
      [outlineVariantStyles]: variant === 'outline',
      [disabledVariantStyles]: disabled,
      [loadingStyles]: loading
    },
    className
  )

  return (
    <button className={classes} disabled={disabled || loading} {...rest}>
      {loading ? (
        <Spinner className="h-6 w-6 stroke-white mx-auto mt-2" />
      ) : (
        <span>{children}</span>
      )}
    </button>
  )
}

export default Button
