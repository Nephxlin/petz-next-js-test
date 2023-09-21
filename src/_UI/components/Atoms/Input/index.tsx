import * as S from './styles'

interface ICustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = (props: ICustomInputProps) => {
  return (
    <S.InputWrapper>
      {props.label && <S.Label>{props.label}</S.Label>}
      <S.Input {...props} />
      {props.error && <S.Error>{props.error}</S.Error>}
    </S.InputWrapper>
  )
}

export default Input;