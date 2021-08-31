import React, { useState, useEffect, useRef } from 'react'
const Atrament = require('atrament')
import { connect } from 'react-redux'
import { saveImageThunk } from '../../redux/actions'
import { HexColorPicker } from 'react-colorful'
import DrawingCharacterModal from './drawing_modals/DrawingCharacterModal'

// material-ui
import { makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const DefaultOptions = (props) => {
    const canvases = props.canvases ?? []
    const names = props.names ?? []
    const { type } = props

    const classes = useStyles()
    const [allDefault, setAllDefault] = useState(0)
    const [defaultChoices, setDefaultChoices] = useState({})

    const chooseDefault = (e) => {
        let choice = e.target.value
        // if the user chooses 0, they're choosing to draw.
        // set defaultChar to 0 and put the graph paper image in
        // and allow them to draw
        if (choice.toString() !== '0') {
            setAllDefault(choice)
            Object.keys(canvases).forEach((canvas) => {
                canvases[canvas].clear()
                canvases[canvas].mode = 'disabled'
                if (choice === '4') {
                    canvases[
                        canvas
                    ].canvas.style.backgroundImage = `url(assets/surpriseBox.jpeg)`
                } else {
                    canvases[canvas].canvas.style.backgroundImage =
                        type === 'character'
                            ? `url(assets/group-chars/${choice}/${canvas}.png)`
                            : type === 'platformAndPrize'
                                ? `url(assets/platforms-prizes/${choice}/${canvas}.png)`
                                : `url(assets/single-chars/${choice}.png)`
                }
                setDefaultChoices((prevChoices) => {
                    return { ...prevChoices, [canvas]: choice }
                })
            })
        }
    }

    const chooseDefaultOrDraw = (e) => {
        let choiceAndCanvas = e.target.value.split(',')
        let choice = choiceAndCanvas[0]
        let canvas = choiceAndCanvas[1]
        setDefaultChoices((prevChoices) => {
            return { ...prevChoices, [canvas]: choice }
        })
        // if the user chooses 0, they're choosing to draw.
        // set defaultChar to 0 and put the graph paper image in
        // and allow them to draw
        if (choice === '0') {
            canvases[canvas].mode = 'draw'
            canvases[
                canvas
            ].canvas.style.backgroundImage = `url(assets/graph-paper.png)`
        }
        // if the user chooses to use a default character, set the default,
        // disable the drawing and clear the sketchpad, and set the
        // appropraite image as the canvas image (random is a surprise box image)
        else {
            canvases[canvas].clear()
            canvases[canvas].mode = 'disabled'
            if (choice !== '4') {
                canvases[canvas].canvas.style.backgroundImage =
                    type === 'character'
                        ? `url(assets/group-chars/${choice}/${canvas}.png)`
                        : type === 'platformAndPrize'
                            ? `url(assets/platforms-prizes/${choice}/${canvas}.png)`
                            : `url(assets/single-chars/${choice}.png)`
            } else {
                canvases[
                    canvas
                ].canvas.style.backgroundImage = `url(assets/surpriseBox.jpeg)`
            }
        }
    }

    function setDataUrl(src, callback) {
        const img = new Image()
        img.crossOrigin = 'Anonymous'
        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            let dataURL
            canvas.height = img.naturalHeight
            canvas.width = img.naturalWidth
            ctx.drawImage(img, 0, 0)
            dataURL = canvas.toDataURL()
            callback(dataURL)
        }
        img.src = src
        if (img.complete || img.complete === undefined) {
            img.src =
                'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='
            img.src = src
        }
    }

    // get a random number between 1 and 3
    const getRandomChar = () => {
        return Math.floor(Math.random() * 3 + 1)
    }

    const handleExport = (e) => {
        e.preventDefault()
        let count = 0
        // if the user has chosen a full default image, convert it to url
        // and put it in local storage (if they chose a random one, get a random number first)
        let choice
        // for each of the canvases,
        Object.keys(canvases).forEach((canvas) => {
            if (
                (defaultChoices[canvas] === '0' && !canvases[canvas].isDirty()) ||
                defaultChoices[canvas] === '4'
            ) {
                choice = getRandomChar().toString()
            } else {
                choice = defaultChoices[canvas]
            }
            // if the user hasn't chosen a default for this canvas and they've drawn on it,
            // put their drawing in local storage
            if (choice === '0' && canvases[canvas].isDirty()) {
                const uri = canvases[canvas].toImage()
                localStorage.setItem(
                    `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
                    uri
                )
                count++
                if (count === 10 && type === 'character') {
                    props.history.push('./platform')
                }
                if (count === 2 && type === 'platformAndPrize') {
                    props.history.push('./game')
                }
                if (count === 1 && type === 'singleCharacter') {
                    props.history.push('./platform')
                }
            }

            // if the user hasn't chosen a default for this canvas OR drawn on it,
            // or they've chosen to receive a random default, set their choice to a random default
            else {
                // set the choice equal to the default chosen, convert it to dataUrl, and set it in local storage
                const url =
                    type === 'character'
                        ? `assets/group-chars/${choice}/${canvas}.png`
                        : type === 'platformAndPrize'
                            ? `assets/platforms-prizes/${choice}/${canvas}.png`
                            : `assets/single-chars/${choice}.png`
                setDataUrl(url, (dataURL) => {
                    localStorage.setItem(
                        `playerDrawn${canvas[0].toUpperCase() + canvas.slice(1)}`,
                        dataURL
                    )
                    count++

                    if (count === 10 && type === 'character') {
                        props.history.push('./platform')
                    }
                    if (count === 2 && type === 'platformAndPrize') {
                        props.history.push('./game')
                    }
                    if (count === 1 && type === 'singleCharacter') {
                        props.history.push('./platform')
                    }
                })
            }
        })
        // move on to the next page after looping through the canvases
    }

    return (
        <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
        >
            <Grid Item>
                <DrawingCharacterModal />
            </Grid>
            <Grid Item>
                {type === 'character' && (
                    <div>
                        <Typography>
                            Either draw each canvas or fill all with pre-drawn options:
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <NativeSelect
                                onChange={chooseDefault}
                                className={classes.selectEmpty}
                            >
                                <option value={0}>Draw character</option>
                                <option value={1}>Character 1</option>
                                <option value={2}>Character 2</option>
                                <option value={3}>Character 3</option>
                                <option value={4}>Surprise me!</option>
                            </NativeSelect>
                            <FormHelperText>
                                Draw, choose one of the provided options, or be surprised!
                            </FormHelperText>
                        </FormControl>
                    </div>
                )}
            </Grid>
            <Grid Item>
                <Typography>
                    Draw each canvas or use a default!
                </Typography>
            </Grid>
            <Grid Item>
                {(allDefault === '0' || allDefault === 0) && (
                    <div>
                        {Object.keys(canvases).map((canvas, index) => (
                            <Grid Item key={index}>
                                <FormControl>
                                    <FormControl className={classes.formControl}>
                                        <NativeSelect
                                            onChange={chooseDefaultOrDraw}
                                            className={classes.selectEmpty}
                                        >
                                            <option value={[0, canvas]}>
                                                Draw {names[canvas]}
                                            </option>
                                            <option value={[1, canvas]}>{names[canvas]} 1</option>
                                            <option value={[2, canvas]}>{names[canvas]} 2</option>
                                            <option value={[3, canvas]}>{names[canvas]} 3</option>
                                            <option value={[4, canvas]}>Surprise me!</option>
                                        </NativeSelect>
                                        <FormHelperText>
                                            Draw, choose one of the provided options, or be
                                            surprised!
                                        </FormHelperText>
                                    </FormControl>
                                </FormControl>
                            </Grid>
                        ))}
                    </div>
                )}
            </Grid>
        </Grid>
    )
}

const mapDispatch = (dispatch) => {
    return {
        saveImage: (name, dataUrl) => dispatch(saveImageThunk(name, dataUrl)),
    }
}

export default connect(null, mapDispatch)(DefaultOptions)
