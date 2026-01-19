type TableProps = {
  data: { id: number; data_hora: string; cliente_nome: string; sala: string, status: string }[];
};

export default function TableSchedule({ data }: TableProps) {
  return (
    <div className="overflow-auto rounded-lg bg-white border border-[#D7D7D7]">
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
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "Agendado"
                      ? "bg-green-100 text-green-700"
                      : item.status === "Cancelado"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 flex gap-2">
                <button className="text-green-500 hover:text-green-700">✔</button>
                <button className="text-red-500 hover:text-red-700">✖</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
