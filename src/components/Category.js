import Image from "next/image"
import useKiosk from "@/hooks/useKiosk";

function Category({ category }) {
    const { currentCategory, handleClickCategory } = useKiosk();
    const { id, name, icon } = category;
    return (
        /*<div className="flex items-center gap-4 w-full border p-5 hover:bg-amber-400">
            <Image 
            width={65}
            height={65}
            src={`/assets/img/icono_${icon}.svg`}
            alt="icon image"
            />
    
            <button
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
            >
                {name}
            </button>
        </div> */
        <button
            className={`${currentCategory?.id === id ? "bg-amber-400" : ""} 
            flex items-center gap-4 w-full border p-5 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
            onClick={() => handleClickCategory(id)}
        >
            <Image
                width={65}
                height={65}
                src={`/assets/img/icono_${icon}.svg`}
                alt="icon image"
            />
            {name}
        </button>
    )
}

export default Category