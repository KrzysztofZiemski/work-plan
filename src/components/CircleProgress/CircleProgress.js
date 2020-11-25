import React, { useState, useEffect } from 'react';
import { Animate } from "react-move";
import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import 'react-circular-progressbar/dist/styles.css';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

const AnimatedProgressProvider = ({ valueStart, duration, easingFunction, children, valueEnd, className }) => {

    let [isAnimated, setIsAnimated] = useState(true)
    useEffect(() => {
        return setIsAnimated(prevProps => !prevProps)
    }, [valueEnd])

    return (
        <div className={className}>
            <Animate
                start={() => ({
                    value: valueStart
                })}
                update={() => ({
                    value: [
                        isAnimated ? 0 : valueEnd
                    ],
                    timing: {
                        duration: duration * 1000,
                        ease: easingFunction
                    }
                })}
            >
                {({ value }) => children(value)}
            </Animate>
        </div>
    );
}

export default AnimatedProgressProvider;

const useStyles = makeStyles(({
    title: {
        textAlign: 'center',
        fontSize: 20,
        margin: 10
    }
}))

export const CircleProgress = ({ className, title, value, secondary }) => {
    const classes = useStyles();

    return (
        <>
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={value}
                duration={1.4}
                easingFunction={easeQuadInOut}
                repeat
                style
            >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <>
                            <Typography className={classes.title}>{title}</Typography>
                            <CircularProgressbar
                                className={className}
                                value={value}
                                text={`${roundedValue}%`}
                                styles={{
                                    // Customize the root svg element
                                    root: {},
                                    // Customize the path, i.e. the "completed progress"
                                    path: {
                                        // Path color
                                        stroke: secondary ? `rgba(${255 - value * 2.5}, ${value * 1.7}, ${0}, 100)` : `rgba(62, 152, 199, 100)`,
                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',
                                        // Customize transition animation
                                        transition: 'stroke-dashoffset .07s linear 0s',
                                        // Rotate the path
                                        // transform: 'rotate(0.25turn)',
                                        transformOrigin: 'center center',
                                    },
                                    // Customize the circle behind the path, i.e. the "total progress"
                                    trail: {
                                        // Trail color
                                        stroke: secondary ? 'white' : '#d6d6d6',
                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',
                                        // Rotate the trail
                                        // transform: 'rotate(0.25turn)',
                                        transformOrigin: 'center center',
                                    },
                                    // Customize the text
                                    text: {
                                        // Text color
                                        fill: 'black',
                                        // Text size
                                        fontSize: '16px',
                                    },
                                    // Customize background - only used when the `background` prop is true
                                    background: {
                                        fill: '#3e98c7',
                                    },
                                }}

                            />
                        </>
                    );
                }}
            </AnimatedProgressProvider>
        </>
    )
}

CircleProgress.defaultProps = {
    title: '',
    className: '',
    value: 0,
    secondary: false,
}

CircleProgress.propTypes = {
    value: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string,
    secondary: PropTypes.bool
}
