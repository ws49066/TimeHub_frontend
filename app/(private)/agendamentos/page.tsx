"use client"

import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../shared/components/Layout/MainLayout";
import TableSchedule from "../../../shared/components/TableSchedule";
import { PagePermissionGuard } from "../../../shared/guards/PagePermission";
import { useAuthStore } from "../../../shared/stores/auth.store";
import { useAgendamentosStore } from "./agendamento.store";

export interface IAgendamento {
    id: number
    date: string
    hour: string
    status: string
    room: {
        room: string
    }
    client: {
        nome: string
        sobrenome: string
    }
}


export default function Agendamentos() {
    const {fetchAgendamento, agendamentos, loading} = useAgendamentosStore()
    const [error, setError] = useState<string | null>(null)

    const user = useAuthStore.getState().user;




    useEffect(() => {
        fetchAgendamento()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const desc = user?.role === "admin" ? "Acompanhe todos os Agendamentos de clientes de forma simples" : "Acompanhe todos os seus agendamentos de forma simples";

    const tableData = useMemo(() => {
        return agendamentos?.map((item) => ({
            id: item.id,
            data_hora: `${new Date(item.date).toLocaleDateString("pt-BR")} às ${item.hour}`,
            cliente_nome: `${item.client.nome} ${item.client.sobrenome}`,
            sala: item.room.room,
            status:item.status
        }))
    }, [agendamentos])

    return (
        <PagePermissionGuard permission="access_system">
            <MainLayout
                title="Agendamentos"
                description={desc}
            >
                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && tableData?.length === 0 && (
                    <p>Nenhum agendamento encontrado.</p>
                )}

                { <TableSchedule data={tableData} />}

            </MainLayout>
        </PagePermissionGuard>
    );
}
