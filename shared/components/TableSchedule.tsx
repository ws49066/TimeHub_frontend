import { useState } from "react";
import { RoomsModal } from "@/features/rooms/components/RoomsModal";
import { AgendamentoModal } from "@/features/agendamentos/components/AgendamentoModal";
import { agendamentoService } from "@/features/agendamentos/services/agendamento.service";
import { IUpdateState } from "@/features/agendamentos/types/Agendamento.types";


interface dataProp {
  id: number;
  data_hora: string;
  cliente_nome: string;
  sala: string,
  status: string
}

type TableProps = {
  data: dataProp[];
}

export default function TableSchedule({ data }: TableProps) {
  const [open, setOpen] = useState(false);
  const [openAgendamento, setOpenAgendamento] = useState(false);

  const ChangeStatus = async (data: dataProp, newStatus: "canceled" | "confirmed") => {
    const payload: IUpdateState = {
      id: String(data.id),
      status: newStatus
    }
    await agendamentoService.updatedState(payload)
  }



  return (
    <div className="overflow-auto rounded-lg bg-white border border-[#D7D7D7]">

      <button
        onClick={() => setOpen(true)}
        className="w-full bg-black text-white mt-2 rounded font-semibold  h-10 text-sm md:h-11 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]"
      >
        MODAL
      </button>

      <button
        onClick={() => setOpenAgendamento(true)}
        className="w-full bg-black text-white mt-2 rounded font-semibold  h-10 text-sm md:h-11 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#D5D5D5]"
      >
        MODAL AGENDAMENTO
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data Agendamento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sala de agendamento</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4">{item.data_hora}</td>
              <td className="px-6 py-4">
                {item.cliente_nome} <br />
                <span className="text-gray-500 text-sm border-[#D7D7D7]">Cliente</span>
              </td>
              <td className="px-6 py-4">{item.sala}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${item.status === "confirmed"
                    ? "bg-green-100 text-green-700"
                    : item.status === "canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button className="text-green-500 hover:text-green-700" onClick={() => ChangeStatus(item, "confirmed")}>✔</button>
                <button className="text-red-500 hover:text-red-700" onClick={() => ChangeStatus(item, "canceled")} >✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <RoomsModal onClose={() => setOpen(false)} />
      )}
      {openAgendamento && (
        <AgendamentoModal onClose={() => setOpenAgendamento(false)} />
      )}
    </div>
  );
}
