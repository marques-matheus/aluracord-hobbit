
import appConfig from '../config.json'
import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import { useRouter } from 'next/router'







function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 20px;
                  font-weight: 600;
                
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [dadosGit, setDadosGit] = React.useState({});

    React.useEffect(() => {
        fetch(`https://api.github.com/users/${username}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
            .then((response) => {
                return response.json()
            }).then(data => {
                setDadosGit(data)

            }).catch(error => console.error(error));
    }, [username])




    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['050'],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/the-lord-of-the-rings-hobbit-house-entrance.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.primary[500],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault()
                            roteamento.push(`/chat?username=${username}`)


                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Bem vindo de volta outra vez</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                const valor = event.target.value;
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[999],
                                    mainColor: appConfig.theme.colors.neutrals[100],
                                    mainColorHighlight: appConfig.theme.colors.primary[200],
                                    backgroundColor: appConfig.theme.colors.primary['050'],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[200],
                                mainColorLight: appConfig.theme.colors.primary[300],
                                mainColorStrong: appConfig.theme.colors.primary[100],
                            }}
                        />
                    </Box>
                    {/* Formulário */}
                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.primary[400],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.primary[100],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >

                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}

                            src={username.length > 2 ?

                                `https://github.com/${username}.png`
                                :
                                'https://logoeps.com/wp-content/uploads/2013/06/the-one-ring-vector-logo.png'

                            }


                        />

                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[400],

                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}

                        </Text>
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                padding: '3px 10px',
                                marginTop: '2px',
                                borderRadius: '1000px'
                            }}>

                            {username.length >= 2
                                ? <p>{dadosGit.location}</p>
                                : ''
                            }

                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}