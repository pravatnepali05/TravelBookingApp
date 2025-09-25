import { useAuth } from "../../context/UserContext";
import { FaUser, FaEnvelope } from "react-icons/fa";

const Details = () => {
  const [auth] = useAuth();

  const users = {
    name: auth?.user?.name,
    email: auth?.user?.email,
  };

  return (
    <div className="p-8 bg-gray-50 h-full flex flex-col justify-center items-start">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User Details</h2>

      <div className="flex items-center text-gray-800 mb-4">
        <FaUser className="mr-3 text-blue-600 text-lg" />
        <span>
          <strong>Name:</strong> {users.name}
        </span>
      </div>

      <div className="flex items-center text-gray-800">
        <FaEnvelope className="mr-3 text-blue-600 text-lg" />
        <span>
          <strong>Email:</strong> {users.email}
        </span>
      </div>
    </div>
  );
};

export default Details;
