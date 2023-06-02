import Head from "next/head"
import Sidebar from "@/components/Sidebar"
import ModalProduct from "@/components/ModalProduct"
import ModalWaiting from "@/components/ModalWaiting"
import ToastProduct from "@/components/ToastProduct"
import Steps from "@/components/Steps"



function Layout({ children, page }) {

  const title = `Café - ${page}`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <div className="lg:flex">
        <Sidebar />
        <main className="lg:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-14">
            <Steps />
            {children}
          </div>
        </main>
      </div>
      <ModalProduct />
      <ModalWaiting />
      <ToastProduct />

    </>
  )
}

export default Layout