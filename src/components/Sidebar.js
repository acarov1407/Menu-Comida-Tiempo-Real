import Image from "next/image";
import useKiosk from "@/hooks/useKiosk";
import Category from "./Category";

function Sidebar() {

  const {categories} = useKiosk();
  return (
    <aside className="lg:w-4/12 xl:w-1/4 2xl:w-1/5">
        <Image 
        className="mx-auto"
        width={200} 
        height={100} 
        src="/assets/img/logo.svg" alt="logo image"/>
        <nav className="mt-12">
            {
              categories.map(_category => (
                <Category 
                key={_category.id}
                category={_category} 
                />
              ))
            }
        </nav>
    </aside>
  )
}

export default Sidebar