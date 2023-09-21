import * as S from './styles'

interface ICustomInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string, label: string }>;
  row?: boolean;
}

const Select = (props: ICustomInputProps) => {
  return (
    <S.SelectWrapper row={props.row}>
      {props.label && <S.Label row={props.row}>{props.label}</S.Label>}
      <S.SelectStyled row={props.row} {...props}>
        <option value="" disabled selected hidden>Selecione uma opção</option>
        {props?.options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </S.SelectStyled>
      {props.error && <S.Error>{props.error}</S.Error>}
    </S.SelectWrapper>
  )
}

export default Select;