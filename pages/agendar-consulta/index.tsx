import { useState } from "react";
import Head from "next/head";
import BasicTemplate from "../../src/_UI/components/Template/BasicTemplate";
import Section from "../../src/_UI/components/Organisms/Section";
import ScheduleForm from "../../src/_UI/components/Molecules/ScheduleForm";
import WarningContainer from "../../src/_UI/components/Organisms/WarningContainer";
import { useRouter } from "next/router";
import slugify from "slugify";
import formatData from "../../src/utils/formatDate";

type FormData = {
  nome: string;
  sobrenome: string;
  region: string;
  city: string;
  date: string;
  time: string;
  pokemons: string[];
}

export default function AgendarConsulta() {
  const router = useRouter();

  async function submitScheduleForm(data: FormData) {
    const makeHttpCall = (await import("../../src/utils/makeCall")).default
    try {
      await makeHttpCall({
        baseService: 'local',
        method: 'POST',
        url: '/scheduling/form',
        data: data
      }).then((res) => {
        res.status === 200 && router.push({
          pathname: `/agendar-consulta/success`,
          query: `date=${formatData(data.date, 'dash')}?time=${data.time}`
        })
      })

    } catch (err) {
      if (err instanceof Error) {
        router.push({
          pathname: "/agendar-consulta/error",
          query: `errorMessage=${slugify(err.message, { lower: true })}`,
        });
      }
    }
  }

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
        <ScheduleForm submitScheduleForm={submitScheduleForm} />
        {/* {data && (
          <WarningContainer result='success' />
        )} */}
      </BasicTemplate>
    </>
  );
}