import {useEffect, useState} from "react";


const useWidth=()=>{
    const [width, setWidth] = useState(typeof window !== "undefined" && window.innerWidth)
    const resize = () => {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', () => resize());
        return () => {
            window.removeEventListener('resize', () => resize());
        };
    }, []);

    return {width}
}

export default useWidth