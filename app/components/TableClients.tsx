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
                  disabled={!item.create_appointment}
                  className="px-4 py-2 rounded-full bg-black text-white text-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white">
                  Agendamento
                </button>

                <button
                  disabled={!item.view_logs}
                  className="px-4 py-2 rounded-full bg-black text-white text-xs disabled:cursor-not-allowed disabled:bg-white disabled:text-black disabled:border">
                  Logs
                </button>
              </td>
              <td className="px-6 py-4">
                <button
                  disabled={!item.access_system}
                  className="px-3 py-2 rounded-full bg-green-100 text-xs text-green-800">
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
