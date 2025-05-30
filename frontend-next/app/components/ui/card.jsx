import Link from "next/link";

const Card = ({ problem }) => {
  const { title, name, date, _id } = problem;
  const tags = problem.tag || [];

  const currentTime = new Date();
  const problemTime = new Date(date);
  const timeDifference = Math.abs(currentTime - problemTime);
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  let timeAgo = `${daysDifference} days ago`;
  if (daysDifference === 0 && hoursDifference === 0 && minutesDifference < 2) {
    timeAgo = `Just now`;
  } else if (daysDifference === 0 && hoursDifference === 0) {
    timeAgo = `${minutesDifference} minutes ago`;
  } else if (daysDifference === 0) {
    timeAgo = `${hoursDifference} hours ago`;
  }

  return (
    <Link
      href={`/question/${_id}`}
      className="flex flex-col md:flex-row items-start w-full border rounded-xl shadow-sm bg-white hover:bg-[#EAE4D5] transition duration-200 my-2"
      style={{ borderColor: "#B6B09F" }}
    >
      <div className="flex flex-col justify-between w-full p-4">
        <h6 className="text-xl font-semibold text-black mb-2">{title}</h6>

        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-3 py-1 rounded-full font-medium uppercase"
              style={{ backgroundColor: "#B6B09F", color: "#FFFFFF" }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center mt-4 text-sm text-gray-700">
          <span className="font-medium text-black">{name}</span>
          <span className="ml-1 text-gray-600">— asked {timeAgo}</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
