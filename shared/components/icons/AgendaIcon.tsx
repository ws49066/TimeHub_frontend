import Image from "next/image";

interface ISizeLogo {
width: number, height: number, active?:boolean
}

export function AgendaIcon({width, height, active}:ISizeLogo) {
    const url = active ? "/icons/agenda.svg" : "/icons/agendaBlack.svg"

    return (
        <Image
            src={url}
            alt=""
            width={width}
            height={height}
            priority
        />
    )
}