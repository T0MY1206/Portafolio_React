import { Link } from 'react-router-dom'
import './Button.css'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonBaseProps {
  variant?: ButtonVariant
  children: React.ReactNode
  className?: string
}

interface ButtonAsButton extends ButtonBaseProps {
  to?: never
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string
  type?: never
  disabled?: never
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const Button = ({
  variant = 'primary',
  children,
  className = '',
  ...rest
}: ButtonProps) => {
  const classNames = `btn btn-${variant} ${className}`.trim()

  if ('to' in rest && rest.to) {
    return (
      <Link to={rest.to} className={classNames} onClick={rest.onClick}>
        {children}
      </Link>
    )
  }

  const { type = 'button', disabled, onClick } = rest as ButtonAsButton
  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
