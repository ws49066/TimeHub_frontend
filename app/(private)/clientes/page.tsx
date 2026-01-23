"use client";

import { useEffect, useMemo, useState } from "react";
import MainLayout from "../../../shared/components/Layout/MainLayout";
import { api } from "../../../shared/api/axios";
import TableClients from "../../../shared/components/TableClients";
import { useAuthStore } from "../../../shared/stores/auth.store";
import { useRouter } from 'next/navigation'
import { useClientStore } from "./cliente.store";


export interface IClientProps {
    id: number
    create_appointment: string
    view_logs: string
    access_system: string
    client: {
        nome: string,
        sobrenome: string,
        endereco: string,
        numero: string,
        cidade: string,
        estado: string,
        bairro: string,
        createdAt: string
    }
}



export default function Clientes() {
    const {clients, getClients, loading} = useClientStore()
    const [error, setError] = useState<string | null>(null)


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

            {!loading && tableData.length === 0 && (
                <p>Nenhum cliente encontrado.</p>
            )}

            {<TableClients data={tableData} />}
            {loading && <p>Carregando...</p>}
        </MainLayout>

    );
}
