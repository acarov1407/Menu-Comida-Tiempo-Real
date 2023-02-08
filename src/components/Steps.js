import { useRouter } from "next/router"
import useKiosk from "@/hooks/useKiosk";

const steps = [
    { step: 1, name: 'Menú', url: '/' },
    { step: 2, name: 'Resumen', url: '/summary' },
    { step: 3, name: 'Datos y Total', url: '/total' }
]

function Steps() {
    const { } = useKiosk();
    const router = useRouter();
    
    const calculateProgress = () => {
        let progress;
        switch(router.pathname){
            case "/":
                progress = 20;
                break;
            case "/summary":
                progress = 50;
                break;
            case "/total":
                progress = 100;
                break;
            default:
                progress = 20;
        }

        return progress;
    }
    return (
        <>
            <div className="flex justify-between mb-5">
                {
                    steps.map(step => (
                        <button
                            key={step.step}
                            type="button"
                            className="text-2xl font-bold"
                            onClick={() => {
                                router.push(step.url);
                            }}
                        >
                            {step.name}
                        </button>
                    ))
                }
            </div>
            <div className="bg-gray-100 mb-10">
                <div 
                className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white"
                style={{width: `${calculateProgress()}%`}}
                >

                </div>
            </div>
        </>
    )
}

export default Steps