import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AccessEmailProps {
  name: string;
  url: string;
}

export default function AccessUserEmail({
  name = "Ana Mesquita",
  url = "https://loja.profbiodicas.com.br/wp-content/uploads/2024/03/arquivo.zip",
}: AccessEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        Obrigado por comprar na nossa loja! Aproveite o seu produto.
      </Preview>
      <Body style={main}>
        <Container className="max-w-96 flex flex-col items-center bg-gray-50 rounded-sm justify-center">
          <Img
            src="https://loja.profbiodicas.com.br/wp-content/uploads/2024/03/logo-prof-1.svg"
            alt="Profbio.Dicas Logo"
          />

          <Text className="text-base">
            <strong>{name}</strong>, Obrigado por comprar na nossa loja!
          </Text>

          <Section className="flex justify-center">
            <Text className="font-bold">
              Clique no botão abaixo para baixar seus arquivos.
            </Text>

            <Section className="mt-4 flex justify-center">
              <Button href={url} style={button}>
                Baixar Arquivos
              </Button>
              <Text className="text-black text-[14px] leading-[24px]">
                ou copie a URL abaixo e cole em seu navegador: <br />
                <Link href={url} className="text-sky-500 no-underline">
                  {url}
                </Link>
              </Text>
            </Section>
          </Section>

          <Text className="text-xs text-gray-500">
            &copy; 2024 Profbio.Dicas. Todos os direitos reservados.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const button = {
  fontSize: "14px",
  backgroundColor: "#000",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
  cursor: "pointer",
};
