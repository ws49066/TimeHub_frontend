import Image from "next/image";

interface ISizeLogo {
width: number, height: number
}

export function Logo({width, height}:ISizeLogo) {
    return (
        <Image
            src="/images/groupLogo.svg"
            alt="Group Logo"
            width={width}
            height={height}
            priority
        />
    )
}