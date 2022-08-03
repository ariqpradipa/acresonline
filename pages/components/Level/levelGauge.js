import * as React from "react";

export default function LevelGauge(props) {

    const { percentage } = props;

    return (
        <>
            <div className="w-[98%] bg-gray-200 h-5 mb-2 mt-1">
                <div className="bg-blue-600 h-5 text-white text-center" style={{ width: percentage }}>{percentage}</div>
            </div>
        </>
    )
}