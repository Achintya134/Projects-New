import { useState, useEffect } from React;

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false)
    useEffect(() => {
        const media= window.matchMedia(query);
        if(media.matches !== matches){
            setMatches(media.matches)

        }
        const listener = () => setMatches(media.matches)
        windows.addEventListner("resize",listener);
        return () => window.removeEventListener("resize", listener)
    }, [matches,query])

    return matches
}

export default useMediaQuery