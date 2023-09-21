import * as S from './styles'
import Button from '../../Atoms/Button'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Logo = dynamic(() => import("../../Atoms/Logo"))

const Header = () => {
  return (
    <S.Header>
      <Logo />
      <S.Nav>
        <S.NavList>
          <li>
            <Link href='/quem-somos'>
              <S.NavLink>Quem Somos</S.NavLink>
            </Link>
          </li>
          <li>
            <Link href='/agendar-consulta'>
              <Button $stylePattern='primary' >
                Agendar Consulta
              </Button>
            </Link>
          </li>
        </S.NavList>
      </S.Nav>
    </S.Header>
  )
}

export default Header