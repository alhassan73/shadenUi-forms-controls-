import zxcvbn from "zxcvbn";

export default function PasswordStrength({ password }) {
  const result = password ? zxcvbn(password) : null;
  const score = result?.score;

  const createPassLabel = () => {
    switch (score) {
      case 0:
        return "weak";
      case 1:
        return "fair";
      case 2:
        return "good";
      case 3:
        return "strong";
      default:
        return "strong";
    }
  };

  const funcProgressColor = () => {
    switch (score) {
      case 0:
        return "#9a3324";
      case 1:
        return "#f6b318";
      case 2:
        return "#165865";
      case 3:
        return "#198754";
      default:
        return "#198754";
    }
  };

  return (
    <div className="relative mt-2">
      <ul className="w-full flex items-center gap-1.5 rounded-lg overflow-hidden max-w-xs">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <li
              key={index}
              className="flex-1 h-1.5 rounded-lg"
              style={{
                backgroundColor:
                  index <= score ? `${funcProgressColor()}` : "#e5e7eb",
              }}
            ></li>
          ))}
      </ul>

      <span
        className="text-xs capitalize block mt-1 w-full max-w-xs text-end px-1"
        style={{ color: `${funcProgressColor()}` }}
      >
        {createPassLabel()}
      </span>
    </div>
  );
}
