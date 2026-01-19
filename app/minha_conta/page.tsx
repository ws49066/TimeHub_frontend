import MainLayout from "../components/Layout/MainLayout";
import TableSchedule from "../components/TableSchedule";
import { PagePermissionGuard } from "../shared/guards/PagePermission";

const agendamentos = [
    { id: 1, hora: "16:00", nome: "Camila Mendes", status: "Em análise" },
    { id: 2, hora: "15:00", nome: "Beatriz Costa", status: "Em análise" },
    { id: 3, hora: "14:00", nome: "Joana Barbosa", status: "Agendado" },
    // ... mais dados
];




export default function MinhaConta() {
    return (
        <PagePermissionGuard permission="access_system">
            <MainLayout 
                title="Agendamentos" 
                description="Acompanhe todos os agendamentos de clientes forma simples"
            >
                <TableSchedule data={agendamentos} />
            </MainLayout>
        </PagePermissionGuard>
    );
}
