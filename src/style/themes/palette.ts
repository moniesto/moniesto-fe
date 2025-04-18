/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme object
 */

export default function themePalette(theme: any) {
    return {
        mode: theme?.mode,
        error: {
            light: theme.colors?.errorLight,
            main: theme.colors?.errorMain,
            dark: theme.colors?.errorDark
        },
        orange: {
            light: theme.colors?.orangeLight,
            main: theme.colors?.orangeMain,
            dark: theme.colors?.orangeDark
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain,
            dark: theme.colors?.warningDark
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark
        },
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            500: theme.colors?.grey500,
            600: theme.colors?.grey600,
            700: theme.colors?.grey700,
            900: theme.colors?.grey900,
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        borderRadius: theme?.borderRadius,
        ...(theme?.mode === 'light'
            ? {
                primary: {
                    light: theme.colors?.primaryLight,
                    main: theme.colors?.primaryMain,
                    dark: theme.colors?.primaryDark,
                    contrastText: theme.colors?.primary800,
                    200: theme.colors?.primary200,
                    800: theme.colors?.primary800
                },
                secondary: {
                    light: theme.colors?.secondaryLight,
                    main: theme.colors?.secondaryMain,
                    dark: theme.colors?.secondaryDark,
                    200: theme.colors?.secondary200,
                    800: theme.colors?.secondary800
                },
                text: {
                    primary: theme.textMain,
                    secondary: theme.textMain,
                    hint: theme.colors?.grey100,
                    contrast: theme.colors?.primary800
                },
                background: {
                    default: theme.colors?.background500,
                    paper: theme.colors.white,
                    200: theme.colors?.background200,
                    500: theme.colors?.background500,
                    600: theme.colors?.background600,
                    800: theme.colors?.background800
                },
            }
            : {
                text: {
                    primary: theme.textMain,
                    secondary: theme.textMain,
                    hint: theme.colors?.grey100,
                    contrast: theme.colors?.primary200
                },
                background: {
                    default: theme.colors?.darkBackground500,
                    paper: theme.colors?.backgroundDarkSecondary,
                    200: theme.colors?.darkBackground200,
                    500: theme.colors?.darkBackground500,
                    600: theme.colors?.darkBackground600,
                    800: theme.colors?.darkBackground800
                },
                primary: {
                    light: theme.colors?.primaryDark,
                    main: theme.colors?.primaryMain,
                    dark: theme.colors?.primaryLight,
                    contrastText: theme.colors?.primary200,
                    200: theme.colors?.primary800,
                    800: theme.colors?.primary200
                },
                secondary: {
                    light: theme.colors?.secondaryDark,
                    main: theme.colors?.secondaryMain,
                    dark: theme.colors?.secondaryLight,
                    200: theme.colors?.secondary800,
                    800: theme.colors?.secondary200
                },
            }),


        // opaque: {
        //     main: theme.colors?.opaque500
        // }
    };
}
