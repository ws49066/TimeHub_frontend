import { useRef } from "react"
import { clientsService } from "../../app/(private)/clientes/client.service"
import { useClientStore } from "../../app/(private)/clientes/cliente.store"
import { filterClients } from "../../app/(private)/clientes/filter"
import { Calendar, ChevronLeft, ChevronRight, Search } from "lucide-react"
import * as Switch from "@radix-ui/react-switch";


interface dataProp {
  id: number
  data_hora: string
  cliente_nome: string
  endereco: string
  create_appointment: string
  view_logs: string
  access_system: string
}

export interface IPayload {

  clientId: number | string,
  access_system?: boolean,
  view_logs?: boolean,
  create_appointment?: boolean

}

type TableProps = {
  data: {
    id: number
    data_hora: string
    cliente_nome: string
    endereco: string
    create_appointment: string
    view_logs: string
    access_system: string
  }[];
};



export default function TableClients({ data }: TableProps) {
  const { clients, getClients, filters, page, pageSize, setPage } = useClientStore()

  const filteredLogs = filterClients(clients, filters)
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


  const handleChangePermissions = async (
    data: dataProp,
    permissions: "create_appointment" | "view_logs" | "access_system",
    change: boolean
  ) => {
    const payload: IPayload = {
      clientId: data.id,
      [permissions]: change
    }

    await clientsService.updatedPermission(payload)
    await getClients()
  }

  return (
    <div className="bg-white flex flex-col gap-6.25 overflow-x-hidden">
      <div className="flex flex-col gap-6.25  border border-[#D7D7D7] rounded-[5px] p-7">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex w-full md:w-110 h-10 border border-[#D7D7D7] items-center px-3.25 gap-3.25">
            <Search width={20} height={20} />
            <input
              type="text"
              className="h-5 w-full focus:outline-none"
              placeholder="Filtrar por nome"
              onChange={(e) =>
                useClientStore.getState().setFilters({ search: e.target.value })
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
                useClientStore.getState().setFilters({ date: e.target.value })
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
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black">Data de cadastro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black hidden md:table-cell">
                  Endereço
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-black">Permissões</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="flex px-6 py-3 text-[14px] font-normal text-black">{item.data_hora}</td>
                  <td className="px-6 py-3 text-black font-medium text-sm">
                    {item.cliente_nome} <br />
                    <span className=" text-xs font-normal border-[#D7D7D7]">Cliente</span>
                  </td>
                  <td className="px-6 py-3 text-[14px] font-normal text-black hidden md:table-cell">
                    {item.endereco}
                  </td>

                  <td className=" flex items-center px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleChangePermissions(item, "create_appointment", !item.create_appointment)}
                      className={`px-4 py-2 rounded-full ${!item.create_appointment ? "border bg-white" : " bg-black text-white"} `}>
                      Agendamento
                    </button>

                    <button
                      onClick={() => handleChangePermissions(item, "view_logs", !item.view_logs)}
                      className={`px-4 py-2 rounded-full ${!item.view_logs ? "border  opacity-50  bg-white" : " bg-black text-white"} `}>
                      Logs
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <Switch.Root
                      checked={!!item.access_system}
                      onClick={() => handleChangePermissions(item, "access_system", !item.access_system)}
                      className="relative w-8.75 h-4 bg-[#B3B3B3] rounded-[60px] data-[state=checked]:bg-black"
                    >
                      <Switch.Thumb
                        className="block w-3 h-3 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5"
                      />
                    </Switch.Root>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE */}
        <div className="md:hidden space-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="mb-2">
                <p className="text-sm text-gray-500">{item.data_hora}</p>
                <p className="font-medium">{item.cliente_nome}</p>
                <span className="text-xs text-gray-500">Cliente</span>
              </div>

              <div className="text-sm mb-2">
                📍 {item.endereco}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => handleChangePermissions(item, "create_appointment", !item.create_appointment)}
                  className={`px-3 py-1 rounded-full text-xs
            ${item.create_appointment ? "bg-black text-white" : "border"}
          `}
                >
                  Agendamento
                </button>

                <button
                  onClick={() => handleChangePermissions(item, "view_logs", !item.view_logs)}
                  className={`px-3 py-1 rounded-full text-xs
            ${item.view_logs ? "bg-black text-white" : "border opacity-50"}
          `}
                >
                  Logs
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Acesso ao sistema</span>
                <Switch.Root
                  checked={!!item.access_system}
                  onClick={() =>
                    handleChangePermissions(item, "access_system", !item.access_system)
                  }
                  className="relative w-8.75 h-4 bg-[#B3B3B3] rounded-[60px] data-[state=checked]:bg-black"
                >
                  <Switch.Thumb
                    className="block w-3 h-3 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5"
                  />
                </Switch.Root>
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
    </div>
  );
}
