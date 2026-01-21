import { clientsService } from "@/app/clientes/client.service"

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

  const ChangePermissions = async (
    data: dataProp,
    permissions: "create_appointment" | "view_logs" | "access_system",
    change: boolean
  ) => {
    const payload: IPayload = {
      clientId: data.id,
      [permissions]: change
    }

    await clientsService.updatedPermission(payload)
  }

  return (
    <div className="overflow-auto rounded-lg bg-white border border-[#D7D7D7]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data de cadastro</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Endereço</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissões</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
              <td className="px-6 py-4">{item.endereco}</td>
              <td className="px-6 py-4 space-x-2">
                <button
                  onClick={() => ChangePermissions(item, "create_appointment", !item.create_appointment)}
                  className={`px-4 py-2 rounded-full ${!item.create_appointment ? "border text-xs disabled:opacity-50  bg-white" : " bg-black text-white"} `}>
                  Agendamento
                </button>

                <button
                  onClick={() => ChangePermissions(item, "view_logs", !item.view_logs)}
                  className={`px-4 py-2 rounded-full ${!item.view_logs ? "border text-xs opacity-50  bg-white" : " bg-black text-white"} `}>
                  Logs
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => ChangePermissions(item, "access_system", !item.access_system)}
                  className={`px-4 py-2 rounded-full ${!item.access_system ? "border text-xs opacity-50  bg-white" : " bg-black text-white"} `}>
                  Ativo
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
