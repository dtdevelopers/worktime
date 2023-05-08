import { useState } from "react"
import { Plus } from "@phosphor-icons/react";

export const WorkHours = ({ 
    methods
}: {
    methods: any
}) => {
    const [turnos, setTurnos] = useState(2)
    
    return (
        <div>
            <div>
                <button
                    title="Adicionar Turno"
                    className="bg-primary my-2 self-center px-4 py-2 rounded-md text-white font-bold"
                    onClick={() => setTurnos(turnos + 1)}
                >
                    <Plus size={20} />
                </button>
            </div>
            {Array.from(Array(turnos)).map((_, index) =>
                <div key={index}>
                    <div>
                        <label>Entrada {index + 1}:</label>
                        <input
                            type={'time'}
                            {...methods.register('endDate')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                        />
                    </div>
                    <div>
                        <label>Saída {index + 1}:</label>
                        <input
                            type={'time'}
                            {...methods.register('endDate')}
                            className='mt-12 w-full rounded-md text-emphasis-medium dark:text-emphasisDark-medium bg-inverseDark-90 dark:bg-inverseLight-50 py-3 px-4 text-sm font-normal leading-5'
                        />
                    </div>
                </div>
            )}
        </div>
    )
}