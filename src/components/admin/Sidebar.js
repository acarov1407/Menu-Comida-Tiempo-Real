import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import Image from "next/image";


function Sidebar() {

    const router = useRouter();
   
    const currentRoute = router.pathname;

    return (
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 py-5">
            <Image
                className="mx-auto"
                width={200}
                height={100}
                src="/assets/img/logo.svg"
                alt="logo image"
            />

            <nav className="mt-12">
                <button
                    className={`${currentRoute === '/admin' ? "bg-amber-400" : ""} 
                  flex items-center gap-4 w-full border p-5 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
                    type="button"
                    onClick={() => {
                        router.push('/admin');
                    }}
                >
                    <Image
                        width={65}
                        height={65}
                        src="/assets/icon/clock.svg"
                        alt="pending icon"
                    />
                    Ordenes Pendientes
                </button>

                <button
                    className={`${currentRoute === '/admin/completed' ? "bg-amber-400" : ""} 
                  flex items-center gap-4 w-full border p-5 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
                    type="button"
                    onClick={() => {
                        router.push('/admin/completed');
                    }}
                >
                    <Image
                        width={65}
                        height={65}
                        src="/assets/icon/check.svg"
                        alt="pending icon"
                    />
                    Ordenes Completadas
                </button>

                <button
                    className={`${currentRoute === '/admin/stats' ? "bg-amber-400" : ""} 
                  flex items-center gap-4 w-full border p-5 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
                    type="button"
                    onClick={() => {
                        router.push('/admin/stats');
                    }}
                >
                    <Image
                        width={65}
                        height={65}
                        src="/assets/icon/info_icon.svg"
                        alt="pending icon"
                    />
                    Estadisticas de Venta
                </button>
            </nav>
        </aside>
    )
}

export default Sidebar