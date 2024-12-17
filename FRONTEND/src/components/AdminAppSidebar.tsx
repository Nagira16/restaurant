import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Data Management",
            url: "#",
            items: [
                {
                    title: "All Users List",
                    url: "/admin/users"
                },
                {
                    title: "All Menus List",
                    url: "/admin/menus"
                },
                {
                    title: "All Tables List",
                    url: "/admin/tables"
                },
                {
                    title: "All Roles List",
                    url: "/admin/roles"
                },
                {
                    title: "All Reviews List",
                    url: "/admin/reviews"
                },
                {
                    title: "All Reservations List",
                    url: "/admin/reservations"
                },
                {
                    title: "All OrderDetails List",
                    url: "/admin/orderDetails"
                },
                {
                    title: "All Nutrients List",
                    url: "/admin/nutrients"
                },
                {
                    title: "All Categories List",
                    url: "/admin/category"
                }
            ]
        },
        {
            title: "Community",
            url: "#",
            items: [
                {
                    title: "Contribution Guide",
                    url: "#"
                }
            ]
        }
    ]
};

const AdminAppSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element => {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="font-bold text-xl border-b-2 border-blue-500">
                Dona Vicky For Admin
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {data.navMain.map((item) => (
                    <Collapsible
                        key={item.title}
                        title={item.title}
                        defaultOpen
                        className="group/collapsible"
                    >
                        <SidebarGroup>
                            <SidebarGroupLabel
                                asChild
                                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <CollapsibleTrigger>
                                    {item.title}
                                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {item.items.map((item) => (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton asChild>
                                                    <Link href={item.url}>
                                                        {item.title}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
};

export default AdminAppSidebar;
