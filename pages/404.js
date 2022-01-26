import { Box, Button, Text, TextField, Image } from '@skynexui/components'
import appConfig from '../config.json'

export default function _404() {
    return (

        <Box styleSheet={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: appConfig.theme.colors.primary[400],
           
        }}>
         <Text
                            
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[999],
                                fontSize: "8rem",
                              
                              
                                
                            }}
                        >
                            Oh,Não!
                            
                        </Text>


        <Image
            styleSheet={{
                
             
            
                maxWidth: '500px',
                height: '500px'
            }}


            src={`https://chpic.su/_data/stickers/s/SmeaGollum/SmeaGollum_004.webp`}


        />

<Text
                            
                            styleSheet={{
                              
                                color: appConfig.theme.colors.neutrals[999],
                                fontSize: "4rem",
                                textAlign: 'center'
                              
                                
                            }}
                        >
                            Essa página não existe ou foi Roubada por Hobbitses
                            
                        </Text>


        </Box>

    )

}
