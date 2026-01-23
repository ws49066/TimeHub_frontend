import { useRef } from "react";
import { filterLogs } from "../../app/(private)/logs/filter"
import { useLogsStore } from "../../app/(private)/logs/logs.store"
import { paginate } from "../../app/(private)/logs/logs.utils"
import { useAuthStore } from "../stores/auth.store"
import { ChevronRight, Search } from 'lucide-react';
import { Calendar } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { AgendaIcon } from "./icons/AgendaIcon";
import { AccountIcon } from "./icons/AccountIcon";


<Search />




export type clientProps = {
  id: string | number,
  nome: string,
  sobrenome: string
}


export interface ILog {
  id: number
  clientId: number
  action: string
  module: string
  createdAt: string
  client?: clientProps
}

export type TableProps = {
  data: {
    id: number;
    action: string;
    module: string;
    hour: string | Date,
    client?: clientProps
  }[];
};

export default function TableLogs() {
  const { user } = useAuthStore()
  const { logs, filters, page, pageSize, setPage } = useLogsStore()

  const filteredLogs = filterLogs(logs, filters)
  const paginatedLogs = paginate(filteredLogs, page, pageSize)

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


  return (
    <div className="overflow-auto  bg-white flex flex-col gap-6.25">
      <div className="flex flex-col gap-6.25  border border-[#D7D7D7] rounded-[5px] p-4">

        <div className="flex gap-3.75">
          <div className="relative flex w-110 h-10  border border-[#D7D7D7] items-center px-3.25 gap-3.25">
            <Search width={20} height={20} />

            <input
              type="text"
              className="h-5 w-full focus:outline-none focus:ring-0"
              placeholder="Filtrar por cliente, tipo ou módulo"
              onChange={(e) =>
                useLogsStore.getState().setFilters({ search: e.target.value })
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
                useLogsStore.getState().setFilters({ date: e.target.value })
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
          <thead >
            <tr className="">
              {user?.role === "admin" ? (
                <th className="px-6 py-3 text-left text-xs font-medium text-black">Cliente</th>
              ) : null}
              <th className="px-6 py-3 text-left text-xs font-medium text-black ">Tipo de atividade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black ">Módulo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-black ">Data e horario</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedLogs.map((item) => (
              <tr key={item.id}>
                {user?.role === "admin" ? (
                  <td className="px-6 py-4">
                    <span className="px-3 py-2 rounded-full bg-gray-100 text-xs">
                      {`${item.client?.nome} ${item.client?.sobrenome}`}
                    </span>
                  </td>
                ) : null}
                <td className="px-6 py-4">
                  <span className="px-3 py-2 rounded-full bg-gray-100 text-xs">
                    {item.action}
                  </span>
                </td>
                <td className="flex px-6 py-4">
                  <span className="flex gap-2 px-3 py-2 rounded-full bg-gray-100 text-xs">
                    {item.module.toLowerCase() === "agendamento" ? <AgendaIcon height={12} width={12} /> : <AccountIcon width={16} height={16}/>}
                    {item.module}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-2 rounded-full bg-gray-100 text-xs">
                    {new Date(item.createdAt).toLocaleString("pt-BR").replace(",", " ás")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div >
  );
}
