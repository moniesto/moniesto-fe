export default function componentStyleOverrides(theme: any) {
    const background800 = theme.mode === "light" ? theme.colors.background800 : theme.colors.darkBackground800;
    const background600 = theme.mode === "light" ? theme.colors.background600 : theme.colors.darkBackground600;
    const background200 = theme.mode === "light" ? theme.colors.background200 : theme.colors.darkBackground200;
    const cardBackground = theme.mode === "light" ? theme.colors.white : theme.colors.darkBackground600
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
                    '&.MuiButton-outlinedSecondary': {
                        backgroundColor: theme?.colors.secondaryLight,
                        color: theme.colors.primaryMain,
                        ".MuiSvgIcon-root": {
                            color: theme.colors.primaryMain
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
                    background: theme.mode === "light" ? theme.colors.paper : theme.colors.darkPaper,
                    border: `1px solid ${background800}`,
                },
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: cardBackground,
                    border: `1px solid ${background800}`,
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
                    border: `1px solid ${background800} `,
                    background: background600,
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
                        WebkitBoxShadow: `0 0 0 100px ${background600} inset`,
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
                    borderColor: background800,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    background: background800,
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    },
                    background: background800,
                    height: "28px",
                    ".MuiChip-label": {
                        height: "18px",
                    },
                },
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
                    background: theme.mode === "light" ? theme.colors.background500 : theme.colors.darkBackground500,
                    border: "none",
                    ".MuiChip-icon": {
                        marginLeft: "10px"
                    }
                }
            }
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    boxShadow: "1px -5px 16px 1px " + background200,
                    ".MuiBottomNavigationAction-root": {
                        minWidth: 0,
                        ".MuiSvgIcon-root": {
                            fontSize: "1.8rem",
                        },
                        "&.Mui-selected": {
                            color: theme.textMain,
                            ".MuiSvgIcon-root": {
                                color: theme.colors.secondaryMain,
                                fontSize: "2rem",
                            },
                            ".MuiBottomNavigationAction-label": {
                                color: theme.colors.secondaryMain,
                                fontWeight: "600",
                                fontSize: "0.8rem",
                                paddingTop: "1px",
                            },
                            ".MuiAvatar-root": {
                                outline: "1px solid " + theme.colors.secondaryMain
                            }
                        }
                    }
                },

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
                    background: background600,
                    border: `1px solid ${background800}`,
                    '&::before': {
                        background: cardBackground,
                        borderColor: background800 + " !important",
                    },
                    ".MuiMenuItem-root": {
                        margin: " 0 6px",
                        borderRadius: theme?.borderRadius.small,
                        padding: "10px 16px"
                    }
                }
            }
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    ".MuiPickersDay-root": {
                        "&.Mui-selected": {
                            color: theme.textSecondary
                        }
                    }
                }
            }
        },
        MuiCalendarOrClockPicker: {
            styleOverrides: {
                root: {
                    ".MuiDateTimePickerToolbar-timeContainer": {
                        ">button": {
                            height: "20px"
                        }
                    }
                }
            }
        },
        MuiClockPicker: {
            styleOverrides: {
                root: {
                    ".MuiClock-clock": {
                        backgroundColor: background800 + " !important",
                    },
                    ".MuiClockNumber-root": {
                        "&.Mui-selected": { color: theme.textSecondary + " !important" }
                    }
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                popper: {
                    border: `1px solid ${background800} !important`,
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
        },
    }
} 