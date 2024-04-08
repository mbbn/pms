import {ThemeOptions} from "@mui/material/styles";
import {alpha, Direction, PaletteMode} from "@mui/material";
import {} from "@mui/x-tree-view/themeAugmentation";
import {blueGrey, red, common} from "@mui/material/colors";

export const defaultFontFamily: string = 'Vazirmatn';
declare module '@mui/material/styles/createPalette' {
    interface ColorRange {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    }

    interface PaletteColor extends ColorRange {
    }
}
export const brand = {
    50: '#F0F7FF',
    100: '#CEE5FD',
    200: '#9CCCFC',
    300: '#55A6F6',
    400: '#0A66C2',
    500: '#0959AA',
    600: '#064079',
    700: '#033363',
    800: '#02294F',
    900: '#021F3B',
};
export const secondary = {
    50: '#F9F0FF',
    100: '#E9CEFD',
    200: '#D49CFC',
    300: '#B355F6',
    400: '#750AC2',
    500: '#6709AA',
    600: '#490679',
    700: '#3B0363',
    800: '#2F024F',
    900: '#23023B',
};
export const gray = {
    50: '#FBFCFE',
    100: '#EAF0F5',
    200: '#D6E2EB',
    300: '#BFCCD9',
    400: '#94A6B8',
    500: '#5B6B7C',
    600: '#4C5967',
    700: '#364049',
    800: '#131B20',
    900: '#090E10',
};
export const green = {
    50: '#F6FEF6',
    100: '#E3FBE3',
    200: '#C7F7C7',
    300: '#A1E8A1',
    400: '#51BC51',
    500: '#1F7A1F',
    600: '#136C13',
    700: '#0A470A',
    800: '#042F04',
    900: '#021D02',
};
const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            light: brand[200],
            main: brand[500],
            dark: brand[800],
            contrastText: brand[50],
            ...(mode === 'dark' && {
                contrastText: brand[100],
                light: brand[300],
                main: brand[400],
                dark: brand[800],
            }),
        },
        secondary: {
            light: secondary[300],
            main: secondary[500],
            dark: secondary[800],
            ...(mode === 'dark' && {
                light: secondary[400],
                main: secondary[500],
                dark: secondary[900],
            }),
        },
        warning: {
            main: '#F7B538',
            dark: '#F79F00',
            ...(mode === 'dark' && {main: '#F7B538', dark: '#F79F00'}),
        },
        error: {
            light: red[50],
            main: red[500],
            dark: red[700],
            ...(mode === 'dark' && {light: '#D32F2F', main: '#D32F2F', dark: '#B22A2A'}),
        },
        success: {
            light: green[300],
            main: green[400],
            dark: green[800],
            ...(mode === 'dark' && {
                light: green[400],
                main: green[500],
                dark: green[700],
            }),
        },
        grey: {
            50: gray[50],
            100: gray[100],
            200: gray[200],
            300: gray[300],
            400: gray[400],
            500: gray[500],
            600: gray[600],
            700: gray[700],
            800: gray[800],
            900: gray[900],
        },
        divider: mode === 'dark' ? alpha(gray[600], 0.3) : alpha(gray[300], 0.5),
        background: {
            default: '#fff',
            paper: gray[50],
            ...(mode === 'dark' && {default: gray[900], paper: gray[800]}),
        },
        text: {
            primary: gray[800],
            secondary: gray[600],
            ...(mode === 'dark' && {primary: '#fff', secondary: gray[400]}),
        },
        action: {
            selected: `${alpha(brand[200], 0.2)}`,
            ...(mode === 'dark' && {
                selected: alpha(brand[800], 0.2),
            }),
        },
    },
    typography: {
        fontFamily: ["Roboto", defaultFontFamily].join(','),
        fontSize: 12,
        h1: {
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 78 / 70,
            letterSpacing: -0.2,
        },
        h2: {
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: 42,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h5: {
            fontSize: 20,
            fontWeight: 600,
        },
        h6: {
            fontSize: 18,
        },
        subtitle1: {
            fontSize: 18,
        },
        subtitle2: {
            fontSize: 16,
        },
        body1: {
            fontFamily: ["Roboto", defaultFontFamily].join(','),
            fontWeight: 400,
            fontSize: 15,
        },
        body2: {
            fontWeight: 400,
            fontSize: 14,
        },
        caption: {
            fontWeight: 400,
            fontSize: 12,
        }
    }
})

export function defaultThemeOptions(dir: Direction | undefined, mode: PaletteMode): ThemeOptions {
    return {
        ...getDesignTokens(mode),
        direction: dir,
        components: {
            MuiAppBar: {
                styleOverrides: {
                },
                defaultProps: {
                    position: 'fixed',
                    sx: {
                        boxShadow: 0,
                        bgcolor: 'transparent',
                        backgroundImage: 'none',
                        mt: 2,
                    }
                }
            },
            MuiToolbar:{
                styleOverrides: {
                },
                defaultProps: {
                    variant: 'regular',
                    disableGutters: false,
                    sx: ((theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'rgba(255, 255, 255, 0.4)'
                                : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)'
                    }))
                }
            },
            MuiSimpleTreeView: {
                styleOverrides:{
                    root:{

                    }
                }
            },
            MuiTreeItem: {
                styleOverrides:{
                    root:{
                    },
                    content:{
                        color: blueGrey[500],
                        '&.Mui-selected':{
                            fontSize: 15,
                            backgroundColor: 'transparent',
                            color: common.black
                        }
                    },
                    label:{
                        fontWeight: 'bold',
                        padding: 5
                    },
                    selected: {
                    }
                }
            }
        }
    }
}

export function adminThemeOptions(dir: Direction | undefined, mode: PaletteMode): ThemeOptions {
    return {
        ...getDesignTokens(mode),
        direction: dir,
        components: {
            MuiAppBar: {
                styleOverrides: {
                },
                defaultProps:{
                    color: 'transparent'
                }
            }
        }
    };
}