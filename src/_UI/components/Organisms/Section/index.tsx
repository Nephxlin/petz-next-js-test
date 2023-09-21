import * as S from './styles'
import Container from "../../Layout/Container";
import Breadcrumbs from "../../Molecules/BreadCrumbs";

interface ISessionProps {
  title: string;
  subTitle: string;
  $stylePattern: 'primary' | 'white'
  breadCrumbs?: boolean;
}

const Section = ({ title = '', subTitle = '', $stylePattern = 'primary' }: ISessionProps) => {
  return (
    <Container $stylePattern={$stylePattern}>
      <Breadcrumbs />
      <S.SectionContainer>
        <S.SectionTitle>{title}</S.SectionTitle>
        <p>{subTitle}</p>
      </S.SectionContainer>
    </Container>
  )
}

export default Section