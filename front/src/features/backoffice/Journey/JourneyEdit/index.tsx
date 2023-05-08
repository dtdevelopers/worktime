import {useCallback, useMemo} from "react";
import JourneyForm from "../JourneyForm/index";
import {useForm} from "react-hook-form";

const JourneyEdit = () => {

    const methods = useForm({
        defaultValues: {},
    });

    const handleEdit = useCallback(() => {
        console.log('bla')
    }, [])

    const renderForm = useMemo(() => {
        return (
            <JourneyForm 
                handleAction={handleEdit}
                isEditing={true}
                methods={methods}
            />
        )
    }, [handleEdit, methods])

    return (
        <div className="flex flex-col gap-2">
            <span className='text-md font-semibold leading-8 text-emphasis-medium dark:text-emphasisDark-medium'>
                Editar Jornada
            </span>
            <div>
                {renderForm}
            </div>
        </div>
    );
}

export default JourneyEdit;
