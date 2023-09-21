import { IButtonProps } from './IButtonProps'
import * as S from './styles'


const Button = ({ children, $stylePattern = 'primary' }: IButtonProps) => {
  return (
    <S.Button $stylePattern={$stylePattern}>
      {children}
    </S.Button>
  )
}

export default Button