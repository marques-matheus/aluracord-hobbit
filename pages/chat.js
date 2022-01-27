import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { FaTelegramPlane, FaTimes } from 'react-icons/fa'





export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setmensagem] = React.useState('');
    const [listaMensagens, setListamensagens] = React.useState([])

    function handlerNovaMensagem(novaMensagem) {
        const mensagem = {
            id: listaMensagens.length,
            de: 'Matheus',
            texto: novaMensagem
        }



        setListamensagens([
            mensagem,
            ...listaMensagens,
        ])
        setmensagem('');
    }



    function handleDeleteMessage(id) {
        const apagarElementoLista = listaMensagens.filter(
            (mensagem) => mensagem.id !== id
        );
        setListamensagens(apagarElementoLista);
    }
   


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['050'],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/07/the-lord-of-the-rings-hobbit-house-entrance.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaMensagens} deleteMessage={handleDeleteMessage}  setListamensagens={setListamensagens} />


                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setmensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()

                                    handlerNovaMensagem(mensagem);

                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label={<FaTelegramPlane />}
                            onClick={(event) => {
                                event.preventDefault();
                                handlerNovaMensagem(mensagem);
                            }}
                            styleSheet={{
                                width: '35px',
                                height: '35px',
                                border: '0',
                                borderRadius: '50px',

                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[700]
                            }}>



                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const handlerDeleteMessage = props.deleteMessage

    return (
        <Box
            tag="ul"
            styleSheet={{

                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/marques-matheus.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                            <Button
                                onClick={(event)=>{
                                    event.preventDefault();
                                handlerDeleteMessage(mensagem.id);
                                }}
                                label={<FaTimes />}
                                styleSheet={{
                                    height: '20px',
                                    width: '20px',
                                    marginLeft: '95%',
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[999],
                                    }
                                }}

                            

                            />
                        </Box>
                        {mensagem.texto}
                    </Text>


                )
            })}




        </Box>
    )
}
