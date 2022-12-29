/**
 * Typography used in theme
 * @param {JsonObject} theme theme object
 */

export default function themeTypography(theme: any) {
    return {
        fontFamily: theme?.fontFamily,
        h6: {
            fontWeight: 500,
            color: theme.textMain,
            fontSize: '0.75em',
            lineHeight: 1.05
        },
        h5: {
            fontSize: '0.895em',
            color: theme.textMain,
            fontWeight: 500
        },
        h4: {
            fontSize: '1em',
            color: theme.textMain,
            fontWeight: 600,
            marginTop: "0 !important"
        },
        h3: {
            fontSize: '1.25em',
            color: theme.textMain,
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5em ',
            color: theme.textMain,
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125em',
            color: theme.textMain,
            fontWeight: 900
        },
        subtitle1: {
            fontSize: '0.875em',
            fontWeight: 500,
            color: theme.textMain
        },
        subtitle2: {
            fontSize: '0.75em',
            fontWeight: 400,
            color: theme.textMain
        },
        caption: {
            fontSize: '0.75em',
            color: theme.textMain,
            fontWeight: 400
        },
        body1: {
            fontWeight: 400,
            lineHeight: '1.334em',
            color: theme?.textMain,
            fontSize: "0.85rem",
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
            color: theme.textMain
        },
        button: {
            textTransform: 'capitalize'
        },
        customInput: {
            marginTop: 1,
            marginBottom: 1,
            '& > label': {
                top: 23,
                left: 0,
                color: theme.grey500,
                '&[data-shrink="false"]': {
                    top: 5
                }
            },
            '& > div > input': {
                padding: '30.5px 14px 11.5px !important'
            },
            '& legend': {
                display: 'none'
            },
            '& fieldset': {
                top: 0
            }
        },
        mainContent: {
            backgroundColor: theme.background,
            width: '100%',
            minHeight: 'calc(100vh - 88px)',
            flexGrow: 1,
            padding: '20px',
            marginTop: '88px',
            marginRight: '20px',
            borderRadius: `${theme?.borderRadius}px`
        },
        menuCaption: {
            fontSize: '0.875em',
            fontWeight: 500,
            color: theme.textMain,
            padding: '6px',
            textTransform: 'capitalize',
            marginTop: '10px'
        },
        subMenuCaption: {
            fontSize: '0.6875em',
            fontWeight: 500,
            color: theme.textMain,
            textTransform: 'capitalize'
        },
        commonAvatar: {
            cursor: 'pointer',
            borderRadius: '8px'
        },
        smallAvatar: {
            width: '22px',
            height: '22px',
            fontSize: '1em'
        },
        mediumAvatar: {
            width: '34px',
            height: '34px',
            fontSize: '1.2em'
        },
        largeAvatar: {
            width: '44px',
            height: '44px',
            fontSize: '1.5em'
        },
        link: {
            color: theme.colors.secondary
        },
    };
}
