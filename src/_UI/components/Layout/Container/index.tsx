import * as S from './styles'
import { IContainerProps } from "./IContainerProps"




const Container = ({ children, $stylePattern = 'white' }: IContainerProps) => {
  return (
    <S.ContainerStyled $stylePattern={$stylePattern}>
      <S.Container>
        {children}
      </S.Container>
    </S.ContainerStyled>
  )

}

export default Container