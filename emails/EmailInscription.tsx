import {
    Body,
    Button,
    Container,
    Head, Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from '@react-email/components';

export const EmailInscription = ({userName} : {userName : string}) => (
    <Html>
        <Head />
        <Body style={main}>
            <Preview>
                Chargement...
            </Preview>
            <Container style={container}>
                <Hr />
                <Img
                    src="https://planti-planta.vercel.app/logo.png"
                    width="40"
                    height="auto"
                    alt="Dancing Plants"
                    style={logo}
                />
                <Hr />
                <Text style={title}>Bonjour {userName},</Text>
                <Text style={paragraph}>Votre compte a été créé avec succès !</Text>
                <Text style={paragraph}>
                    Bienvenue dans votre espace Dancing Plant.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href="https://planti-planta.vercel.app"
                        >
                        Aller sur le site !
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Belle navigation,
                    <br />
                    Jérémy
                </Text>
                <Hr />
                <Section style={sectionLogo}>
                    <Button style={buttonIcon}  href={"https://github.com/Jeremy-Cloarec"} target={"_blank"}  aria-label={"Lien vers mon compte Github"}>
                        <Img aria-hidden={true} src={`https://planti-planta.vercel.app/github.png`} width="auto" height="25" alt="Github" />
                    </Button>
                    <Button style={buttonIcon} href={"https://linkedin.com/in/jy-cloarec"} target={"_blank"}  aria-label={"Lien vers mon compte LinkedIn"}>
                        <Img aria-hidden={true} src={`https://planti-planta.vercel.app/linkedin.png`} width="auto" height="25" alt="LinkedIn" />
                    </Button>
                    <Button style={buttonIcon} href={"https://instagram.com/Jeremy_Cloarec"} target={"_blank"}  aria-label={"Lien vers mon compte Instagram"}>
                        <Img aria-hidden={true} src={`https://planti-planta.vercel.app/instagram.png`} width="auto" height="25" alt="Instagram" />
                    </Button>
                </Section>
                <Hr />
                <Button href={`https://planti-planta.vercel.app`} target={"_blank"}  aria-label={"Lien vers la page des dessins de plantes"}>
                    <Img
                        src={`https://planti-planta.vercel.app/plants/dancing_plant_4.png`}
                        width="100%"
                        height="auto"
                        alt="Dessin de Dancing Plant 4"
                        style={imgFooter}
                    />
                </Button>
            </Container>
        </Body>
    </Html>
);

export default EmailInscription;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
};

const logo = {
    margin: '0 auto',
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
};

const title = {
    fontSize: '24px',
    fontWeight: 'bold',
}

const btnContainer = {
    textAlign: 'center' as const,
};
const sectionLogo = {
    width: '100%',
    maxWidth:"100%",
}
const imgFooter = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%',
    marginTop: '16px',
}

const button = {
    backgroundColor: '#B5E888',
    borderRadius: '3px',
    color: '#1D1E1B',
    fontSize: '16px',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '12px',
};

const buttonIcon = {
    marginLeft: '8px',
    width:"30%",
    textAlign:"center" as const,
}

