export default function componentStyleOverrides(theme: any) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "0 24px",
                    fontWeight: 700,
                    borderRadius: theme?.borderRadius,
                    height: '51px',
                    fontSize: '1.05rem',
                    boxShadow: "unset !important",
                    minWidth: "90px",

                    "&.MuiButton-containedInherit": {
                        color: theme.colors.primaryMain
                    },
                    '&.MuiButton-containedSecondary': {
                        color: theme?.colors?.white,
                        // backgroundColor: theme?.colors.secondaryMain + "!important",
                        ".MuiSvgIcon-root": {
                            color: theme.colors.darkTextMain
                        },
                        '&:hover': {
                            backgroundColor: theme?.colors.secondary800
                        },
                    },
                    '&.MuiButton-sizeMedium': {
                        height: '35px',
                        fontSize: '0.9rem',
                    },
                    ".MuiButton-textPrimary": {
                        color: theme.textMain
                    }
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: theme?.borderRadius
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    background: theme.sectionPrimary,
                },
                rounded: {
                    borderRadius: `${theme?.borderRadius}`
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: theme.sectionPrimary,
                },
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.textDark,
                    padding: '20px',
                    'button': {
                        padding: 0,
                        marginLeft: 0
                    }
                },
                title: {
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: "1rem"
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.darkTextPrimary,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: `${theme?.borderRadius}`,
                    transition: "all 0.3s ease",
                    '.MuiTypography-root': {
                        fontWeight: 600,
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.colors?.primary,
                        fontSize: '0.875rem',

                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.MuiInputBase-colorSecondary": {
                        background: theme.mode === "light" ? theme.backgroundSecondary : theme.colors.backgroundDarkPrimary,
                        input: {
                            background: theme.mode === "light" ? theme.backgroundSecondary : theme.colors.backgroundDarkPrimary,
                        },
                        textarea: {
                            background: theme.mode === "light" ? theme.backgroundSecondary : theme.colors.backgroundDarkPrimary,
                        }
                    },
                    background: theme.backgroundSecondary,
                    border: 0,
                    borderRadius: `${theme?.borderRadius}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.grey400
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors?.primaryLight
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    background: theme.backgroundSecondary,
                    padding: '15.5px 14px',
                    borderRadius: `${theme?.borderRadius}`,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    },
                    '&::placeholder': {
                        color: theme.textMain
                    },
                    '&:-webkit-autofill': {
                        WebkitBoxShadow: '0 0 0 100px ' + theme.backgroundSecondary + ' inset',
                        background: "content-box"
                    },
                    color: theme.textMain
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    border: 0,
                    borderRadius: `${theme?.borderRadius}`
                },
                // fieldset: {
                //     border: 0
                // }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors?.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme?.colors?.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.divider,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: theme.colors?.secondaryLight
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.paper,
                    background: theme.colors?.grey700
                }
            }
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: theme.appBar
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: theme?.textMain,
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                paper: {
                    backgroundColor: theme.sectionPrimary + " !important",
                    '&::before': {
                        backgroundColor: theme.sectionPrimary + " !important",
                    }
                }
            }
        }

    }
} 