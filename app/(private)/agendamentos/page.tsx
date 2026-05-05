"use client"

import { useEffect, useMemo, useState } from "react";
import { MainLayout } from "../../../shared/components/Layout/MainLayout";
import { TableSchedule } from "../../../shared/components/TableSchedule";
import { PagePermissionGuard } from "../../../shared/guards/PagePermission";
import { useAuthStore } from "../../../shared/stores/auth.store";
import { useAgendamentosStore } from "../../../features/agendamentos";
import { AgendamentoFilters } from "@/features/agendamentos/types/agendamento.types";


export default function Agendamentos() {
    const { fetchAgendamento, agendamentos, loading } = useAgendamentosStore()
    const [error, setError] = useState<string | null>(null)

    const user = useAuthStore.getState().user;

    useEffect(() => {
        fetchAgendamento()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const desc = user?.role === "admin" ? "Track all client schedulings easily" : "Track all your schedulings easily";

    const tableData: AgendamentoFilters[] = useMemo(() => {
        const data = "2026-01-27";
        const [ano, mes, dia] = data.split("-").map(Number);

        return agendamentos?.map((item) => ({
            id: item.id,
            data_hora: `${new Date(ano, mes - 1, dia).toLocaleDateString("en-US")} at ${item.hour}`,
            cliente_nome: `${item.client.nome} ${item.client.sobrenome}`,
            sala: item.room.room,
            status: item.status
        }))
    }, [agendamentos])

    return (
        <PagePermissionGuard permission="access_system">
            <MainLayout
                title="Schedulings"
                description={desc}
            >
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {<TableSchedule data={tableData} />}

            </MainLayout>
        </PagePermissionGuard>
    );
}
