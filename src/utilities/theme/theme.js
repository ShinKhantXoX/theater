import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes : {
        light : {
            palette : {
                primary : '#2072AF',
                secondary : '#0070FF',
                info : '#DFFFFD',
                gold : '#FFD700',
                whiteSmoke : '#F5F5F5',
                platinum : '#E5E4E2',
                gray : '#91A3B0',
                textGray : '#708090',
                danger : '#E60026',
                smokyDark : '#100C08'
            }
        }
    }
});

export default theme;