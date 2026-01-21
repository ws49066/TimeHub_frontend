// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetchAddressByCep(cep: string, setValue: any) {
    const cleanCep = cep.replace(/\D/g, '')

    if (cleanCep.length !== 8) return

    try {
        const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`
        )

        const data = await response.json()

        if (data.erro) return

        setValue('endereco', data.logradouro)
        setValue('bairro', data.bairro)
        setValue('cidade', data.localidade)
        setValue('estado', data.uf)
    } catch (error) {
        console.error('Erro ao buscar CEP', error)
    }
}
