import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import AdminAppSidebar from "@/components/AdminAppSidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar";

export default function AdminLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <SidebarProvider>
                <AdminAppSidebar />
                <SidebarInset>
                    <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />

                        <DynamicBreadcrumb />
                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
