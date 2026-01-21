import { useLogsStore } from "@/app/logs/logs.store";
import { useAuthStore } from "../stores/auth.store";
import { filterLogs } from "@/app/logs/filter";
import { paginate } from "@/app/logs/logs.utils";

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


  return (
    <div className="overflow-auto rounded-lg bg-white border border-[#D7D7D7]">
      <div className="flex  gap-10">
        <input
          placeholder="Filtrar por cliente, tipo ou módulo"
          onChange={(e) =>
            useLogsStore.getState().setFilters({ search: e.target.value })
          }
        />

        <input
          type="date"
          onChange={(e) =>
            useLogsStore.getState().setFilters({ date: e.target.value })
          }
        />

      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {user?.role === "admin" ? (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
            ) : null}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo de atividade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Módulo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data e horario</th>
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
              <td className="px-6 py-4">
                <span className="px-3 py-2 rounded-full bg-gray-100 text-xs">
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

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ‹
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              fontWeight: page === i + 1 ? 'bold' : 'normal',
            }}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ›
        </button>
      </div>
    </div >
  );
}
