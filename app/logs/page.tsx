"use client"
import { useEffect, useState } from "react";
import MainLayout from "../../shared/components/Layout/MainLayout";
import { api } from "../../shared/api/axios";
import { PagePermissionGuard } from "../../shared/guards/PagePermission";
import TableLogs from "../../shared/components/TableLogs";
import { useAuthStore } from "../../shared/stores/auth.store";

interface Log {
    id: number
    clientId: number
    action: string
    module: string
    createdAt: string
}


export default function Logs() {
    const [logs, setLogs] = useState<Log[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const user = useAuthStore.getState().user;

    const getLogs = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await api.get("/logs")

            if (res.data && res.data.data && res.data.data.logs) {
                setLogs(res.data.data.logs)
            } else {
                setLogs([])
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.response?.data?.message  || "Erro ao carregar os logs.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getLogs()
    }, [])

    // Mapeia os logs para o formato do TableLogs
    const tableData = logs.map((log) => ({
        id: log.id,
        action: log.action,
        module: log.module,
        hour: new Date(log.createdAt).toLocaleString("pt-BR").replace(",", " ás")
    }))

    const desc = user?.role === "admin" ? "Acompanhe todos os Logs dos clientes" : "Acompanhe todos os seus Logs";

    return (
        <PagePermissionGuard permission="view_logs">
            <MainLayout
                title="Logs"
                description={desc}
            >
                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && logs.length === 0 && <p>Nenhum log encontrado.</p>}

                {logs.length > 0 && <TableLogs data={tableData} />}
            </MainLayout>
        </PagePermissionGuard>
    );
}
