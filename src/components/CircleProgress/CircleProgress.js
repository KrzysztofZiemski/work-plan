import React, { useState } from 'react';
import { Animate } from "react-move";
import {
    CircularProgressbar, CircularProgressbarWithChildren,
    buildStyles
} from 'react-circular-progressbar';
import { easeQuadInOut } from 'd3-ease';
import 'react-circular-progressbar/dist/styles.css';

class AnimatedProgressProvider extends React.Component {


    state = {
        isAnimated: false
    };

    static defaultProps = {
        valueStart: 0
    };

    componentDidMount() {
        this.setState({
            isAnimated: !this.state.isAnimated
        });

    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        return (
            <div style={{ width: 300, height: 300 }}>
                <Animate
                    start={() => ({
                        value: this.props.valueStart
                    })}
                    update={() => ({
                        value: [
                            this.state.isAnimated ? this.props.valueEnd : this.props.valueStart
                        ],
                        timing: {
                            duration: this.props.duration * 1000,
                            ease: this.props.easingFunction
                        }
                    })}
                >
                    {({ value }) => this.props.children(value)}
                </Animate>
            </div>
        );
    }
}

export default AnimatedProgressProvider;

export const CircleProgress = () => {

    let [value, setValue] = useState(44);

    return (
        <>
            <AnimatedProgressProvider
                valueStart={0}
                valueEnd={value}
                duration={1.4}
                easingFunction={easeQuadInOut}
                repeat

            >
                {value => {
                    const roundedValue = Math.round(value);
                    return (
                        <CircularProgressbar
                            value={value}
                            text={`${roundedValue}%`}
                            styles={buildStyles({
                                pathTransition: "none",
                                pathColor: `rgba(134, 50, 199, 1)`,
                                textColor: 'rgba(134, 50, 199, 1)',
                            })}

                        />
                    );
                }}
            </AnimatedProgressProvider>
            <button onClick={() => setValue(prevProps => prevProps + 10)}>++</button>
        </>
    )
}