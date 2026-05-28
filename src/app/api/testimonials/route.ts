import { NextResponse } from "next/server";

export async function GET() {
  // Simulating a delay to demonstrate SWR loading states
  await new Promise((resolve) => setTimeout(resolve, 800));

  const testimonials = [
    {
      id: "1",
      name: "Dr. Roberto Almeida",
      role: "Diretor Clínico, Cardiocenter",
      text: "A implementação do portal do paciente reduziu nossas ligações na recepção em 40%. A experiência dos nossos pacientes melhorou significativamente, e a previsibilidade financeira da clínica também.",
    },
    {
      id: "2",
      name: "Dra. Mariana Costa",
      role: "Sócia, Clínica Vida & Saúde",
      text: "O dashboard gerencial criado nos deu clareza sobre o faturamento de cada convênio e os índices de no-show. Substituímos planilhas complexas por uma interface simples e em tempo real.",
    },
    {
      id: "3",
      name: "Carlos Mendes",
      role: "Gestor Hospitalar",
      text: "O sistema de autoatendimento sincronizado acabou com as filas na nossa recepção. A integração via WhatsApp para lembretes foi o divisor de águas para nossa operação no dia a dia.",
    },
  ];

  return NextResponse.json(testimonials);
}
