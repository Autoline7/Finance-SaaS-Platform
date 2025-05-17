import { Header } from "@/components/header";
import { Suspense } from "react";

type Props = {
    children: React.ReactNode;
}

const DashboardLayout = ({children} : Props) =>{
    return (
        <>
            <Suspense>
            <Header />
            <main className="px-3 lg:px-14">
                {children}
            </main>
            </Suspense>
        </>
    )
}

export default DashboardLayout;