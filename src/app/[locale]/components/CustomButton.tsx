import { cn } from "../lib/utils"

const CustomButton = ({
    disabled,
    isRounded,
}: {
    disabled: boolean;
    isRounded: boolean;
}) => {
    return (

        //-------------------  Logjika Butonit pa CN ---------------------------
        // <button
        //   className={`text-sm ${disabled ? "bg-gray-300" : "bg-blue-500"} ${
        //     isRounded && "rounded-full"
        // } p-4`}  
        // >

        //   Hello
        // </button>


        //-------------------  Logjika e butonit me CN -------------------------

        <button className={cn("text-sm", disabled ? "bg-gray-300" : "bg-blue-500",
            isRounded && "rounded-full",
            "p-4"
        )}
        >
            Hello
        </button>
    );
};

export default CustomButton
