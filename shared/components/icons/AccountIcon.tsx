import Image from "next/image";

interface ISizeLogo {
width: number, 
height: number,
active?: boolean
}

export function AccountIcon({width, height, active}:ISizeLogo) {
    const url = active ? "/icons/account.svg" : "/icons/accountBlack.svg"

    return (
        <Image
            src={url}
            alt="account icon"
            width={width}
            height={height}
            priority
        />
    )
}