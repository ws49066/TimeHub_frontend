type TableProps = {
  data: { id: number; action: string; module: string; hour: string }[];
};

export default function TableLogs({ data }: TableProps) {
  return (
    <div className="overflow-auto rounded-lg bg-white border border-[#D7D7D7]">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo de atividade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Módulo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data e horario</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id}>
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
                  {item.hour}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
