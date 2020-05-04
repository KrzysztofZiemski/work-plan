import React, { useContext } from 'react';
import { WorkPlanContext } from '../GraphicPage';
import Line from '../Line/Line';

const Shift = ({ shift, children }) => {
            const { workPlan } = useContext(WorkPlanContext);

            return (
                        <div>
                                    {children}
                                    {workPlan.workShifts[shift].lines.map((line, index) => (
                                                <Line key={`line${index}`} shift={shift} line={index}>
                                                            <h3>{`Linia ${line.lineNumber}`}</h3>
                                                </Line>
                                    ))}
                        </div>
            )
}

export default Shift;