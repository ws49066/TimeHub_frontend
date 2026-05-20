"use client"
import { useEffect, useState } from "react";
import {MainLayout} from "../../../shared/components/Layout/MainLayout";
import { api } from "../../../shared/api/axios";
import { PagePermissionGuard } from "../../../shared/guards/PagePermission";
import {TableLogs} from "../../../shared/components/TableLogs";
import { useAuthStore } from "../../../shared/stores/auth.store";
import { useLogsStore } from "../../../features/logs";


export default function Logs() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { logs, setLogs } = useLogsStore()

    const user = useAuthStore.getState().user;

    useEffect(() => {
        const getLogs = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await api.get("/logs")
                const data = res.data.data.logs

                setLogs(data)

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                setError(err.response?.data?.message || "Error loading logs.")
            } finally {
                setLoading(false)
            }
        }

        getLogs()
    }, [setLogs])


    const desc = user?.role === "admin" ? "Monitor all client logs" : "Monitor all your logs";

    return (
        <PagePermissionGuard permission="view_logs">
            <MainLayout
                title="Logs"
                description={desc}
            >
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {<TableLogs />}
            </MainLayout>
        </PagePermissionGuard>
    );
}
