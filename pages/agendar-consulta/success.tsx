import Head from "next/head";
import BasicTemplate from "../../src/_UI/components/Template/BasicTemplate";
import Section from "../../src/_UI/components/Organisms/Section";
import WarningContainer from "../../src/_UI/components/Organisms/WarningContainer";
import { useRouter } from "next/router";

export default function AgendarConsulta() {
  const router = useRouter();
  const { date, time } = router.query;

  return (
    <>
      <Head>
        <title>Centro Pokémon - Agendar Consulta</title>
        <meta name="description" content="Recupere seus pokémons em 5 segundos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicTemplate>
        <Section
          stylepattern='primary'
          title='Agendar Consulta'
          subTitle='Recupere seus pokémons em 5 segundos'
        />
        <WarningContainer result='success' date={date as string} time={time as string} />
      </BasicTemplate>
    </>
  );
}