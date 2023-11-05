import LineGradient from "../components/LineGradient"
import useMediaQuery from "../hooks/useMediaQuery"
import { motion } from "framer-motion"

const MySkills = () =>{
    const isAboveMediumScreens = useMediaQuery("(min-width:1050px)")

    return (
        <section id="skills" className="pt-10 pb-24">
            <div className="md:flex md:justify-between md:gap-16 mt-32">
                <p>
                My <span className="text-red">SKILLS</span>
                    
                </p>
            </div>
        </section>
    )
}