import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { FaTelegramPlane, FaTimes } from 'react-icons/fa';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';



const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SupabaseClient = createClient(URL, ANON_KEY)

//

function realTime(msgModificada) {

    return SupabaseClient.from('mensagens')
        .on('*', (respLive) => {
            if (respLive.eventType === 'INSERT') {
                
                msgModificada('INSERT', respLive.new)
            } else if (respLive.eventType === 'DELETE') {
                msgModificada('DELETE', respLive.old)
            }
        })
        .subscribe()
}


export default function ChatPage() {
    // Sua lógica vai aqui
    const [mensagem, setmensagem] = React.useState('');
    const [listaMensagens, setListamensagens] = React.useState([])
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;


    React.useEffect(() => {
        SupabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                setListamensagens(data)
            });


        realTime((eventType, msg) => {
            if (eventType === 'INSERT') {
                setListamensagens((valorAtual) => {
                    return [msg, 
                        ...valorAtual]
                })
            } else if (eventType === 'DELETE') {
                setListamensagens((valorAtual) => {
                    return (
                        valorAtual.filter((msgSelecioanda) => {
                            return msgSelecioanda.id != msg.id
                        })
                    )
                })
            }
        })
    }, []);


    function handlerNovaMensagem(novaMensagem) {
        const mensagem = {

            de: usuarioLogado,
            texto: novaMensagem
        }



        SupabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ]).then(({ data }) => {

            });
        setmensagem('')
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
                <Header user = {usuarioLogado} />
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

                    <MessageList mensagens={listaMensagens} 
                    setListamensagens={setListamensagens} 
                    SupabaseClient={SupabaseClient}/>


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
                            label='➹'
                            onClick={(event) => {
                                event.preventDefault();
                                handlerNovaMensagem(mensagem);
                            }}
                            styleSheet={{
                                borderRadius: '50%',
                                padding: '0 3px 0 0',
                                minWidth: '35px',
                                minHeight: '35px',
                                fontSize: '20px',
                                marginRight: '5px',
                                marginBottom: '8px',
                                lineHeight: '0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[700]
                            }}>
                        </Button>
                        <ButtonSendSticker

                            onStickerClick={(sticker) => {
                                handlerNovaMensagem(`:sticker: ${sticker}`)
                                console.log('sticker')
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header(props) {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Box styleSheet={{ display: 'flex' , flexDirection: 'row', width: '35%', alignItems: 'center', justifyContent: 'left'}}>
                    <Image 
                        src={`https://github.com/${props.user}.png`}
                        styleSheet={{
                            width: '15%',
                            borderRadius: '50px'
                        }}
                    />
                    <Text 
                        variant='heading5'
                        styleSheet={{
                            marginLeft: '1rem',
                            fontSize: '16px'
                        }}>
                            {props.user}                     
                    </Text>
                </Box>
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

    function handlerDeleteMsg(id) {
        const listaFiltrada = props.mensagens.filter(
            mensagemFitlrada => mensagemFitlrada.id !== id
        );

        props.SupabaseClient
            .from('mensagens')
            .delete()
            .match({ id: id })
            .then(() => {
                props.setListamensagens(listaFiltrada)
            })

    }

    return (
        <Box
            tag="ul"
            styleSheet={{

                overflow: 'auto',
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
                                    pointer: 'cursor'
                                }}
                                onMouseOver={
                                    () => {

                                        console.log('mouseover')
                                        return (
                                            <Box
                                                styleSheet={{
                                                    width: '150px',
                                                    height: '200px'
                                                }}


                                            >
                                                <Text>
                                                    Teste
                                                </Text>

                                            </Box>
                                        )
                                    }
                                }
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
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
                                onClick={(event) => {
                                    event.preventDefault();
                                    handlerDeleteMsg(mensagem.id);
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
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{
                                        Width: '150px',
                                        Height: 'auto'
                                    }} />
                            )
                            : (
                                mensagem.texto
                            )}
                        {/*{mensagem.texto}*/}
                    </Text>
                )
            })}
        </Box>
    )
}
