import RiderInfo from "./RiderInfo.jsx";

function ShowRiders({ riders , acceptedride}) {
    return (
        <>
            {riders && riders.map((rider) => (
                <RiderInfo rider={rider} acceptedride={acceptedride} />
            ))}
        </>
    )
}

export default ShowRiders;