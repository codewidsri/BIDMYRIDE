import RiderInfo from "./RiderInfo.jsx";

function ShowRiders({ riderfares }) {
    return (
        <>
            {riderfares && riderfares.map((rider) => (
                <RiderInfo rider={rider} />
            ))}
        </>
    )
}

export default ShowRiders;