"use client";

import { useEffect, useMemo, useState } from "react";
import {MainLayout} from "../../../shared/components/Layout/MainLayout";
import {TableClients} from "../../../shared/components/TableClients";
import { useClientStore } from "../../../features/clientes";



export default function Clientes() {
    const {clients, getClients, loading} = useClientStore()
    const [error] = useState<string | null>(null)


    useEffect(() => {
        getClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const tableData = useMemo(() => {
        return clients?.map((item) => ({
            id: item.id,
            data_hora: new Date(item.client.createdAt).toLocaleString("pt-BR").replace(",", " ás"),
            cliente_nome: `${item.client.nome} ${item.client.sobrenome}`,
            endereco: `${item.client.endereco}, ${item.client.numero}, ${item.client.bairro}, ${item.client.cidade} - ${item.client.estado}`,
            create_appointment: item.create_appointment,
            view_logs: item.view_logs,
            access_system: item.access_system
        }))
    }, [clients])

    return (
        <MainLayout
            title="Clientes"
            description="Overview de todos od clientes"
        >
            {error && <p className="text-red-500">{error}</p>}


            {<TableClients data={tableData} />}
            {loading && <p>Carregando...</p>}
        </MainLayout>

    );
}
