"use client"

import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../shared/components/Layout/MainLayout";
import TableSchedule from "../../shared/components/TableSchedule";
import { PagePermissionGuard } from "../../shared/guards/PagePermission";
import { api } from "../../shared/api/axios";
import { useAuthStore } from "../../shared/stores/auth.store";

interface IAgendamento {
    id: number
    date: string
    hour: string
    status: string
    room: {
        room: string
    }
    client: {
        nome: string
    }
}


export default function Agendamentos() {
    const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const user = useAuthStore.getState().user;


    const getAgendamentos = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await api.get("/scheduling")

            setAgendamentos(res.data?.data?.allScheduling ?? [])

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(err)
            setError(err.response?.data?.message || "Erro ao buscar agendamentos")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAgendamentos()
    }, [])

    const desc = user?.role === "admin" ? "Acompanhe todos os Agendamentos de clientes de forma simples" : "Acompanhe todos os seus agendamentos de forma simples";

    const tableData = useMemo(() => {
        return agendamentos.map((item) => ({
            id: item.id,
            data_hora: `${new Date(item.date).toLocaleDateString("pt-BR")} às ${item.hour}`,
            cliente_nome: item.client.nome,
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

                {!loading && tableData.length === 0 && (
                    <p>Nenhum agendamento encontrado.</p>
                )}

                {tableData.length > 0 && <TableSchedule data={tableData} />}

            </MainLayout>
        </PagePermissionGuard>
    );
}
