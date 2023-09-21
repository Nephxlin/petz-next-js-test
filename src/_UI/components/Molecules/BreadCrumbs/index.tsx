import Link from 'next/link';
import { useRouter } from 'next/router';
import * as S from './styles'

const Breadcrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter((segment) => segment !== '');

  const breadcrumbs = pathSegments.map((segment, index) => {
    const cleanedSegment = segment.replace(/-/g, ' ');
    const label = cleanedSegment.charAt(0).toUpperCase() + cleanedSegment.slice(1);
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return { label, path };
  });

  return (
    <S.BreadCrumbsContainer>
      <S.BreadCrumbsList>
        <Link href='/'>
          <S.CrumbHome>
            Home
          </S.CrumbHome>
        </Link>
        {breadcrumbs.map((breadcrumb, index) => (
          <S.CrumbLink key={index}>
            <p>{breadcrumb.label}</p>
          </S.CrumbLink>
        ))}
      </S.BreadCrumbsList>
    </S.BreadCrumbsContainer>
  );
};

export default Breadcrumbs;