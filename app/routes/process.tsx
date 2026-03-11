import { useSearchParams, Link } from "react-router";

export default function Process() {
  const [searchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  const destination = searchParams.get("destination");
  const from = searchParams.get("from");

  const getProcessSteps = (vehicleType: string) => {
    const steps: { [key: string]: string[] } = {
      car: [
        "Start the car engine",
        "Enter destination in GPS", 
        "Follow the route",
        "Park at destination",
        "Arrive at " + destination
      ],
      train: [
        "Go to the train station",
        "Buy a ticket",
        "Wait for the train",
        "Board the train",
        "Arrive at " + destination + " station"
      ],
      plane: [
        "Go to the airport",
        "Check in and go through security",
        "Board the plane", 
        "Flight to destination",
        "Arrive at " + destination
      ],
      ship: [
        "Go to the port",
        "Board the ship",
        "Sail to destination",
        "Disembark at port",
        "Arrive at " + destination
      ],
      bike: [
        "Check the bike",
        "Start cycling",
        "Follow the bike path",
        "Lock the bike",
        "Arrive at " + destination
      ],
      bus: [
        "Go to the bus stop",
        "Wait for the bus",
        "Board and pay fare",
        "Ride to destination",
        "Get off at " + destination
      ],
      taxi: [
        "Call or hail a taxi",
        "Tell driver the destination",
        "Ride to " + destination,
        "Pay the fare",
        "Arrive at destination"
      ],
      walking: [
        "Check the route",
        "Start walking",
        "Follow the path",
        "Enjoy the journey",
        "Arrive at " + destination
      ],
    };
    return steps[vehicleType] || [];
  };

  if (!vehicle || !destination) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Invalid Request</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Please select a vehicle and destination.
          </p>
        </div>
      </div>
    );
  }

  const steps = getProcessSteps(vehicle);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {vehicle} Journey to {destination}
        </h1>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-6">Journey Process:</h2>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center space-x-4 text-left">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                {index + 1}
              </div>
              <p className="text-lg">{step}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to={destination === "Place One" ? "/place-one" : "/place-two"}
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Journey
          </Link>
          <div className="mt-4">
            <Link
              to={from || "/"}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              ← Back to {from || "Home"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
