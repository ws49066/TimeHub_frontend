import { useRef, useState } from "react";
import { IUpdateState } from "../../features/agendamentos/types/Agendamento.types";
import { agendamentoService } from "../../features/agendamentos/services/agendamento.service";
import { RoomsModal } from "../../features/rooms/components/RoomsModal";
import { AgendamentoModal } from "../../features/agendamentos/components/AgendamentoModal";
import { Calendar, Check, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useAgendamentosStore } from "../../app/(private)/agendamentos/agendamento.store";
import { paginate } from "../../app/(private)/agendamentos/agandamento.utils";
import { filterAgendamento } from "../../app/(private)/agendamentos/filter";


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
  const { agendamentos, filters, page, pageSize, setPage } = useAgendamentosStore()

  const filteredLogs = filterAgendamento(agendamentos, filters)
  const totalPages = Math.ceil(filteredLogs.length / pageSize)
  const inputRef = useRef(null);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }



  const ChangeStatus = async (data: dataProp, newStatus: "canceled" | "confirmed") => {
    const payload: IUpdateState = {
      id: String(data.id),
      status: newStatus
    }
    await agendamentoService.updatedState(payload)
  }





  return (
    <div className="overflow-auto  bg-white flex flex-col gap-6.25">
      <div className="flex flex-col gap-6.25  border border-[#D7D7D7] rounded-[5px] p-7">
        <div className="flex gap-3.75">
          <div className="relative flex w-110 h-10  border border-[#D7D7D7] items-center px-3.25 gap-3.25">
            <Search width={20} height={20} />

            <input
              type="text"
              className="h-5 w-full focus:outline-none focus:ring-0"
              placeholder="Filtrar por nome"
              onChange={(e) =>
                useAgendamentosStore.getState().setFilters({ search: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3.75 relative w-44.25 border border-[#d7d7d7] h-10">

            <input
              ref={inputRef}
              type="date"
              className=" rounded-[5px] px-3 py-2 pr-10
                   focus:outline-none focus:ring-0
                   [&::-webkit-calendar-picker-indicator]:opacity-0"
              onChange={(e) =>
                useAgendamentosStore.getState().setFilters({ date: e.target.value })
              }
            />
            <Calendar
              className="absolute right-3 top-1/2 -translate-y-1/2
                   h-5 w-5 text-black cursor-pointer"
              onClick={() => inputRef.current?.showPicker()}
            />
          </div>

        </div>

        <div className="border-t border-[#d7d7d7] opacity-100" />

        <table className="min-w-full divide-y divide-gray-200">
          <thead>
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
              <tr key={item.id}
                className={`${item.status === "confirmed"
                  ? "bg-[#F2FFFD]"
                  : item.status === "canceled"
                    ? "bg-[#FFF3F3]"
                    : "bg-white"
                  }`}
              >
                <td className="px-6 py-3 text-[14px] font-normal text-black">{item.data_hora}</td>
                <td className="px-6 py-3 text-black font-medium text-sm">
                  {item.cliente_nome} <br />
                  <span className=" text-xs font-normal border-[#D7D7D7]">Cliente</span>
                </td>
                <td className="px-5 py-4">
                  <span className="px-2.5 py-1.5 bg-black text-white rounded-[60px]">
                    {item.sala}
                  </span>

                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3.75 py-1.25 rounded-full text-xs border font-medium ${item.status === "confirmed"
                      ? "bg-[#DBFFFA] border border-[#10C3A9] text-[#10C3A9]"
                      : item.status === "canceled"
                        ? "bg-[#FFF5F5] border border-[#FF0000] text-[#EA0000]"
                        : "bg-[#f5f5f5] border border-[#A4AAAD] text-[#676767]"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="w-7.5 h-7.5 rounded-[60px] bg-black text-white flex items-center justify-center hover:bg-red-700" onClick={() => ChangeStatus(item, "canceled")} > <X /> </button>
                  <button className="w-7.5 h-7.5 rounded-[60px] bg-black text-white flex items-center justify-center hover:bg-green-700" onClick={() => ChangeStatus(item, "confirmed")}>    <Check /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>


      {/* Botao falta adicionar na tabela */}
      {/* <button
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
      </button> */}


      <div className="flex gap-1.75 justify-center items-center overflow-hidden">

        <div onClick={handlePrevPage} className="py-1 bg-black text-white rounded-sm">
          <ChevronLeft width={18} height={12} />
        </div>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`${page === i + 1 ? "py-1 px-2.75 bg-black text-white  rounded-sm" : "font-normal"}`}
          >
            {i + 1}
          </button>
        ))}

        <div onClick={handleNextPage} className="py-1 bg-black text-white rounded-sm">
          <ChevronRight width={18} height={12} />
        </div>

      </div>


      {open && (
        <RoomsModal onClose={() => setOpen(false)} />
      )}
      {openAgendamento && (
        <AgendamentoModal onClose={() => setOpenAgendamento(false)} />
      )}
    </div>
  );
}
