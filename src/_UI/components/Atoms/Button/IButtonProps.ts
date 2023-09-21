export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  $stylePattern: 'primary' | 'secondary'
  fullwidth?: boolean
}
