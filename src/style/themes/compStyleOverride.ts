export default function componentStyleOverrides(theme: any) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: "0 24px",
                    fontWeight: 700,
                    height: '51px',
                    fontSize: '1.05rem',
                    boxShadow: "unset !important",
                    minWidth: "90px",

                    "&.MuiButton-containedInherit": {
                        color: theme.colors.primaryMain
                    },
                    '&.MuiButton-containedSecondary': {
                        color: theme.mode === "light" ? theme?.colors?.white : theme.colors.primaryMain,
                        // backgroundColor: theme?.colors.secondaryMain + "!important",
                        ".MuiSvgIcon-root": {
                            color: theme.mode === "light" ? theme?.colors?.white : theme.colors.primaryMain,
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
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    background: theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600,
                },
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600,
                    border: `1px solid ${theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800}`,
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
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    borderRadius: `${theme?.borderRadius.main} `,
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
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    color: theme.textMain + " !important",
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    border: `1px solid ${theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800} `,
                    background: theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600,
                    // '& .MuiOutlinedInput-notchedOutline': {
                    //     borderColor: theme.colors?.grey400
                    // },
                    // '&:hover $notchedOutline': {
                    //     borderColor: theme.colors?.primaryLight
                    // },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    padding: '15.5px 14px',
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
                        WebkitBoxShadow: `0 0 0 100px ${theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600} inset`,
                        background: "content-box"
                    },
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    border: 0,
                },
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
                    borderColor: theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800,
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
                    background: theme.mode === "light" ? theme.colors.background500 : theme.colors.darkBackground500
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
                    background: theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600,
                    border: `1px solid ${theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800}`,
                    '&::before': {
                        background: theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600,
                        borderColor: theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800 + "!important",
                    },
                    ".MuiMenuItem-root": {
                        margin: " 0 6px",
                        borderRadius: theme?.borderRadius.small,
                        padding: "10px 16px"
                    }
                }
            }
        },
        // MuiCalendarPicker: {
        //     styleOverrides: {
        //         root: {
        //             ".MuiClock-clock": {
        //                 backgroundColor: theme.colors?.primaryLight + " !important",
        //             }
        //         }
        //     }
        // },
        MuiClockPicker: {
            styleOverrides: {
                root: {
                    ".MuiClock-clock": {
                        backgroundColor: theme.colors?.primaryLight + " !important",
                    }
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                popper: {
                    border: `1px solid ${theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800} !important`,
                    borderRadius: theme?.borderRadius.main,
                    ".MuiAutocomplete-listbox": {
                        ".MuiAutocomplete-option": {
                            margin: " 0 6px",
                            borderRadius: theme?.borderRadius.small,
                            padding: "10px 16px"
                        }
                    },
                    ".MuiPaper-root": {
                        background: theme.mode === "light" ? theme.colors.background500 : theme.colors.darkBackground500 + " !important",
                    }
                }
            }
        },
        MuiSnackbar: {
            styleOverrides: {
                root: {
                    borderRadius: theme?.borderRadius.small,
                    boxShadow: `0px 4px 27px -9px ${theme.colors.primaryMain}`
                }
            }
        }
    }
} 