"use client";

import { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import { api } from "../shared/api/axios";
import TableClients from "../components/TableClients";


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
    const [clientes, setClients] = useState<IClientProps[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getClients = async () => {
        setLoading(true)
        setError(null)

        try {
            const res = await api.get("/administrator/clients")
            setClients(res.data.data ?? [])

        } catch (error) {
            console.error(error)
            setError("Erro ao carregar os clientes.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getClients()
    }, [])

    const tableData = useMemo(() => {
        return clientes.map((item) => ({
            id: item.id,
            data_hora: new Date(item.client.createdAt).toLocaleString("pt-BR").replace(",", " ás"),
            cliente_nome: `${item.client.nome} ${item.client.sobrenome}`,
            endereco: `${item.client.endereco}, ${item.client.numero}, ${item.client.bairro}, ${item.client.cidade} - ${item.client.estado}`,
            create_appointment: item.create_appointment,
            view_logs: item.view_logs,
            access_system: item.access_system
        }))
    }, [clientes])

    return (
        <MainLayout
            title="Clientes"
            description="Overview de todos od clientes"
        >
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && tableData.length === 0 && (
                <p>Nenhum cliente encontrado.</p>
            )}

            {tableData.length > 0 && <TableClients data={tableData} />}
        </MainLayout>

    );
}
