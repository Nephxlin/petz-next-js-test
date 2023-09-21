import Footer from '../../Organisms/Footer'
import Header from '../../Organisms/Header'
import * as S from './styles'

interface IBasicTemplateProps {
  children: React.ReactNode
}

const BasicTemplate = ({ children }: IBasicTemplateProps) => {
  return (
    <main>
      <Header />
      <S.Content>
        {children}
      </S.Content>
      <Footer />
    </main>
  )
}

export default BasicTemplate