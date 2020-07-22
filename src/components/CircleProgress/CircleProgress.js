import React, { useState, useEffect } from 'react';
import { Animate } from "react-move";
import {
    CircularProgressbar,
    buildStyles
} from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import 'react-circular-progressbar/dist/styles.css';
import { Typography, Grid } from '@material-ui/core';

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

export const CircleProgress = (props) => {

    return (
        <>
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={props.value}
                duration={1.4}
                easingFunction={easeQuadInOut}
                repeat
                style
            >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <>
                            <Typography style={{ textAlign: 'center', padding: 10, fontSize: '34px' }}>{props.title ? props.title : ''}</Typography>
                            <CircularProgressbar
                                className={props.className}
                                value={value}
                                text={`${roundedValue}%`}
                                styles={buildStyles({
                                    pathTransition: "none",
                                    pathColor: `rgb(60, 141, 188)`,
                                    textColor: 'rgba(0, 0, 0, 1)',
                                })}

                            />
                        </>
                    );
                }}
            </AnimatedProgressProvider>
        </>
    )
}