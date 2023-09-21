import Head from "next/head"
import BasicTemplate from "../../src/_UI/components/Template/BasicTemplate"
import Section from "../../src/_UI/components/Organisms/Section"
import ScheduleForm from "../../src/_UI/components/Organisms/ScheduleForm"



const AgendarConsulta = () => {

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
          $stylePattern='primary'
          title='Agendar Consulta'
          subTitle='Recupere seus pokémons em 5 segundos'
        />
        <ScheduleForm />
      </BasicTemplate>
    </>
  )
}

export default AgendarConsulta