import { useRef } from "react";
import { filterLogs, useLogsStore, paginate, clientProps } from "../../features/logs"
import { useAuthStore } from "../stores/auth.store"
import { ChevronRight, Search } from 'lucide-react';
import { Calendar } from "lucide-react";
import { ChevronLeft } from 'lucide-react';
import { AgendaIcon } from "./icons/AgendaIcon";
import { AccountIcon } from "./icons/AccountIcon";

export type { clientProps, ILog } from "../../features/logs"

export type TableProps = {
  data: {
    id: number;
    action: string;
    module: string;
    hour: string | Date,
    client?: clientProps
  }[];
};

export function TableLogs() {
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
    <div className="bg-white flex flex-col gap-6.25 overflow-x-hidden">
      <div className="flex flex-col gap-6.25  border border-[#D7D7D7] rounded-[5px] p-4">

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex w-full md:w-110 h-10 border border-[#D7D7D7] items-center px-3.25 gap-3.25">
            <Search width={20} height={20} />
            <input
              type="text"
              className="h-5 w-full focus:outline-none"
              placeholder="Filtrar por cliente, tipo ou módulo"
              onChange={(e) =>
                useLogsStore.getState().setFilters({ search: e.target.value })
              }
            />
          </div>

          <div className="relative w-full md:w-44.25 h-10 border border-[#d7d7d7] rounded-[5px]">
            <input
              ref={inputRef}
              type="date"
              className="w-full h-full rounded-[5px] px-3 pr-10 focus:outline-none
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              onChange={(e) =>
                useLogsStore.getState().setFilters({ date: e.target.value })
              }
            />
            <Calendar
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer"
              onClick={() => inputRef.current?.showPicker()}
            />
          </div>
        </div>


        <div className="border-t border-[#d7d7d7] opacity-100" />
        <div className="hidden md:block w-full overflow-x-auto">
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
                      {item.module.toLowerCase() === "agendamento" ? <AgendaIcon height={12} width={12} /> : <AccountIcon width={16} height={16} />}
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
        {/* MOBILE */}
        <div className="md:hidden space-y-4">
          {paginatedLogs.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              {user?.role === "admin" && (
                <div className="text-sm font-medium mb-1">
                  {item.client?.nome} {item.client?.sobrenome}
                </div>
              )}

              <div className="flex items-center gap-2 text-sm mb-2">
                {item.module.toLowerCase() === "agendamento" ? (
                  <AgendaIcon height={14} width={14} />
                ) : (
                  <AccountIcon height={14} width={14} />
                )}
                <span>{item.module}</span>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {item.action}
              </div>

              <div className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleString("pt-BR").replace(",", " às")}
              </div>
            </div>
          ))}
        </div>


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
