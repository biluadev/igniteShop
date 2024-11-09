import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";

export default function Success() {
    return (
        <SuccessContainer>
            <h1>Compra efetuada!</h1>

            <ImageContainer>
                
            </ImageContainer>

            <p>
            <strong>Bilua Vagnei</strong>, 
            sua <strong>Camiseta beyond the Limits</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
            voltar ao catalogo
        </Link>
        </SuccessContainer>
    )
}