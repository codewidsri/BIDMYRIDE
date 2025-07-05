import RiderInfo from "./RiderInfo.jsx";

function ShowRiders({ riderfares , acceptedride}) {
    return (
        <>
            {riderfares && riderfares.map((rider) => (
                <RiderInfo rider={rider} acceptedride={acceptedride} />
            ))}
        </>
    )
}

export default ShowRiders;