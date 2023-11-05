const SocialMediaIcons = () => {
    return (
        <div className="flex justify-center md:justify-start my-10 gap-7">
            <a 
            className="hover:opacity-50 transition duration-500"
            href="https://www.linkedin.com.com"
            target="_blank"
            rel="noreferrer">
                <img src="../assets/twitter.png" alt="linkedin"/>

            </a>
            <a 
            className="hover:opacity-50 transition duration-500"
            href="https://www.github.com"
            target="_blank"
            rel="noreferrer">
                <img src="../assets/linkedin.png" alt="github"/>

            </a>
        </div>
    )
}

export default SocialMediaIcons